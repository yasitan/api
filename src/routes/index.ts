import { Router } from 'express';
import publicRouter from './public';
import authRouter from './auth';
import { response } from '../middlewares/utils/response';

const router = Router();

router.use('/public', publicRouter, response);
router.use('/auth', authRouter, response);

export default router;
