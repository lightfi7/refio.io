import User from "../models/User";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail, sendVerificationEmail } from "../utils/mailer";
import { Request, Response } from "express";
import { PrivateRequest } from "../middleware/authMiddleware";
import Session from "../models/Session";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = '1h';

const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = password; // Ideally, hash the password here
        const verificationCode = generateVerificationCode();

        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400).json({ message: 'Oops! It looks like you already have an account with that email.' });
            return;
        }

        const newUser = new User({ name, email, password: hashedPassword, verificationCode });
        await newUser.save();

        await sendVerificationEmail(email, verificationCode);

        const validToken = jwt.sign({ email, action: 'verify-code' }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.status(200).json({ message: 'Welcome aboard! Please check your email to verify your account.', user: newUser, validToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password, browser } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'Hmm... We couldn’t find an account with that email.' });
            return;
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: 'Oops! That password doesn’t seem to be right. Give it another shot!' });
            return;
        }

        const accessToken = jwt.sign({ userId: user._id, browser }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        await Session.updateOne({
            ip: browser?.ip,
            osName: browser?.osName,
            browserName: browser?.browserName,
        }, {
            userId: user._id,
            ip: browser?.ip,
            sessionId: accessToken,
            osName: browser?.osName,
            browserName: browser?.browserName,
        }, {
            upsert: true,
        });
        res.status(200).json({ message: 'Welcome back!', user, accessToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const me = async (req: PrivateRequest, res: Response) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.send({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'We couldn’t find an account with that email. Please check and try again!' });
            return;
        }

        const resetCode = generateVerificationCode();
        user.resetToken = resetCode;
        user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
        await user.save();

        await sendResetPasswordEmail(email, resetCode);

        const validToken = jwt.sign({ email, action: 'reset-password' }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.status(200).json({ message: 'Check your inbox! We’ve sent you a code to reset your password.', validToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const confirmVerificationCode = async (req: Request, res: Response) => {
    const { code, validToken } = req.body;

    try {
        const { email, action } = jwt.verify(validToken, JWT_SECRET) as { email: string; action: string };
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'Oops! It seems the verification code is invalid or has expired.' });
            return;
        }

        switch (action) {
            case 'verify-code':
                if (user.verificationCode !== code) {
                    res.status(400).json({ message: 'That verification code doesn’t match. Please try again!' });
                    return;
                }
                user.isVerified = true;
                await user.save();
                res.status(200).json({ message: 'Great news! Your email has been verified successfully.', redirectUrl: '/sign-in' });
                return;

            case 'reset-password':
                if (user.resetToken !== code || !user.resetTokenExpiry || user.resetTokenExpiry.getTime() < Date.now()) {
                    res.status(400).json({ message: 'Oops! The reset code is either invalid or has expired.' });
                    return;
                }

                const newValidToken = jwt.sign({ uid: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
                res.status(200).json({ message: 'Verification successful! You can now reset your password.', redirectUrl: `/reset-password/${newValidToken}` });
                return;

            default:
                res.status(400).json({ message: 'Hmm... Something went wrong with the action provided.' });
                return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { validToken, password } = req.body;

    try {
        const decoded = jwt.verify(validToken, JWT_SECRET) as { uid: string };
        const userId = decoded.uid;

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'We couldn’t find an account with that ID.' });
            return;
        }

        // Ideally hash the password here
        user.password = password;

        // Clear reset token and expiry
        user.resetToken = null;
        user.resetTokenExpiry = null;

        await user.save();

        res.status(200).json({ message: 'Your password has been successfully reset! You can now log in with your new password.' });
    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            res.status(400).json({ message: 'Oops! The token is either invalid or has expired. Please request a new one.' });
            return;
        }

        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};
