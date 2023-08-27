import { Router } from 'express';
import publicRouter from './public';
import authRouter from './auth';
import userRouter from './user';
import conversationRouter from './conversation';
import { response } from '../middlewares/utils/response';
import { verify } from '../middlewares/auth';

const router = Router();

router.use('/public', publicRouter, response);
router.use('/auth', authRouter, response);
router.use('/users', verify, userRouter, response);
router.use('/conversations', verify, conversationRouter, response);

export default router;
