import express from 'express';
import upload from '../middleware/uploadMiddleware';

import { authenticateJWT } from '../middleware/authMiddleware';
import { deleteAccount, getBrowserSessions, logOutOtherBrowsers, updateUser } from '../controllers/userController';

const router = express.Router();

router.put('/update', authenticateJWT, upload, updateUser);
router.delete('/delete', authenticateJWT, deleteAccount);
router.post('/get-browser-sessions', authenticateJWT, getBrowserSessions);
router.post('/logout-other-browsers', authenticateJWT, logOutOtherBrowsers);

export default router;