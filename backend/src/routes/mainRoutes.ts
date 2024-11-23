import express from 'express';
import { getProgram, getPrograms, getSearchParams, postComment, addVote, getComments, getSamplePrograms } from "../controllers/mainController";

import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/get-programs', authenticateJWT, getPrograms);
router.post('/get-sample-programs', authenticateJWT, getSamplePrograms);
router.post('/get-program', authenticateJWT, getProgram);
router.post('/get-search-params', getSearchParams);
router.post('/post-comment', authenticateJWT, postComment);
router.post('/get-comments', authenticateJWT, getComments);
router.post('/add-vote', authenticateJWT, addVote);


export default router;