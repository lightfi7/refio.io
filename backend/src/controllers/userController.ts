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

export const getBrowserSessions = async (req: PrivateRequest, res: Response) => {
    try {
        const id = req.body.userId;
        const sessions = await Session.find({ userId: id });

        res.status(200).send({
            sessions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};

export const logOutOtherBrowsers = async (req: PrivateRequest, res: Response) => {
    try {
        const id = req.body.userId;

        await Session.deleteMany({ userId: { $ne: id } });

        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong on our end. Please try again later!' });
    }
};