import express from 'express';
import { getProgram, getPrograms, getSearchParams } from "../controllers/mainController";

import { authenticateJWT } from "../middleware/authMiddleware";


const router = express.Router();

router.post('/get-programs', getPrograms);
router.post('/get-program', getProgram);
router.post('/get-search-params', getSearchParams);

export default router;