import User from '../models/User';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { PrivateRequest } from "../middleware/authMiddleware";
import Session from "../models/Session";


export const updateUser = async (req: PrivateRequest, res: Response) => {
    try {
        const id = req.body.userId;

        let updateData: any = {};

        if (req.file) {
            updateData.image = req.file.filename;
        }

        if (req.body.removeAvatar) {
            updateData.image = null;
        }

        if (req.body.name) {
            updateData.name = req.body.name;
        }

        if (req.body.email) {
            updateData.email = req.body.email;
        }

        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        if (req.body.notifications) {
            updateData.notifications = req.body.notifications;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            res.status(404).json({ message: 'Not Found' });
            return;
        }

        res.status(200).json({
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const deleteAccount = async (req: PrivateRequest, res: Response) => {
    try {
        const id = req.body.userId;

        await User.findByIdAndDelete(id);

        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const subscribed = async (req: PrivateRequest, res: Response) => {
    try {
        const id = req.body.userId;
        const today = new Date();
        const membershipStartDate = today;
        today.setDate(today.getDate() + 30);
        const membershipEndDate = today
        const user = await User.findByIdAndUpdate(id, { isPremium: true, membershipStartDate, membershipEndDate }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'Not Found' });
            return;
        }
        res.status(200).json({
            user: {
                _id: user._id,
                isPremium: user.isPremium,
                membershipStartDate: user.membershipStartDate,
                membershipEndDate: user.membershipEndDate,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });

    }
}

export const updateBrowserSession = async (req: PrivateRequest, res: Response) => {
    await Session.findOneAndUpdate({
        userId: req.body.userId,
        ip: req.body.ip
    }, {
        $set: {
            userId: req.body.userId,
            ip: req.body.ip,
            os: req.body.os,
            browser: req.body.browser,
        },
    }, { upsert: true, new: true });
    res.status(200).json({ message: 'Browser session updated successfully' });
}


export const getBrowserSessions = async (req: PrivateRequest, res: Response) => {
    try {
        const userId = req.body.userId;
        const sessions = await Session.find({ userId });
        res.status(200).send({
            sessions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};


export const getBrowserSession = async (req: PrivateRequest, res: Response) => {
    try {
        const { userId, ip, os, browser } = req.body;
        const session = await Session.findOne({
            userId,
            ip,
            os,
            browser,
        });
        if (!session) {
            res.status(401).json({
                message: 'No session found'
            });
            return
        }
        res.status(200).send({
            session,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const logoutOtherBrowsers = async (req: PrivateRequest, res: Response) => {
    try {
        const { userId, ip, os, browser } = req.body;
        await Session.deleteMany({
            userId,
            $or: [
                { ip: { $ne: ip } },
                { os: { $ne: os } },
                { browser: { $ne: browser } }
            ]
        });
        res.status(200).json({ message: 'Other browsers logged out successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};
