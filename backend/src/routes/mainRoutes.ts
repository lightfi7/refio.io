import express from 'express';
import { getProgram, getPrograms, getSearchParams, postComment, addVote, getComments } from "../controllers/mainController";

import { authenticateJWT } from "../middleware/authMiddleware";


const router = express.Router();

router.post('/get-programs', getPrograms);
router.post('/get-program', getProgram);
router.post('/get-search-params', getSearchParams);
router.post('/post-comment', postComment);
router.post('/get-comments', getComments);
router.post('/add-vote', addVote);


export default router;