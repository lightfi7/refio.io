import express from 'express';
import upload from '../middleware/uploadMiddleware';

import { authenticateJWT } from '../middleware/authMiddleware';
import { deleteAccount, getBrowserSession, getBrowserSessions, logoutOtherBrowsers, subscribed, updateBrowserSession, updateUser } from '../controllers/userController';

const router = express.Router();

router.post('/subscribed', authenticateJWT, subscribed);
router.put('/update', upload, authenticateJWT, updateUser);
router.delete('/delete', authenticateJWT, deleteAccount);

router.post('/get-browser-session', authenticateJWT, getBrowserSession);
router.post('/update-browser-session', authenticateJWT, updateBrowserSession);
router.post('/get-browser-sessions', authenticateJWT, getBrowserSessions);
router.post('/logout-other-browsers', authenticateJWT, logoutOtherBrowsers);

export default router;