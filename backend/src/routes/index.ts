import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { Express } from 'express-serve-static-core';
import mainRoutes from "./mainRoutes";


export default function initializeRoutes(app: Express) {
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/main', mainRoutes);
}