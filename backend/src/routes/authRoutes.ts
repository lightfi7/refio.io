import express from 'express';
import {
     registerUser,
     loginUser,
     requestPasswordReset,
     confirmVerificationCode,
     resetPassword,
     me
} from '../controllers/authController';
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/me', authenticateJWT, me);
router.post('/request-password-reset', requestPasswordReset);
router.post('/confirm-code', confirmVerificationCode);
router.post('/reset-password', resetPassword);

export default router;