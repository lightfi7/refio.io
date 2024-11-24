import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Session from "../models/Session";
import User from '../models/User';

export interface PrivateRequest extends Request {
  token?: string;
  userId?: string;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  if (user.isBlocked) {
    res.status(401).json({ message: 'User is inactive' });
    return;
  }

  user.lastActivedAt = new Date();
  await user.save();

  next();
  // const token = req.header('Authorization')?.replace('Bearer ', '');
  // if (!token) {
  //   res.status(401).json({ message: 'No token, authorization denied' });
  //   return;
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
  //   const session = await Session.findOne({userId: decoded.userId});

  //   if (!session) {
  //     res.status(401).json({ message: 'No session found.' });
  //     return;
  //   }
  //   req.token = token;
  //   req.userId = decoded.userId;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: 'Token is not valid' });
  // }
};