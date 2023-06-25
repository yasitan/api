import { Router } from 'express';
import publicRouter from './public';
import { response } from '../middlewares/utils/response';

const router = Router();

router.use('/public', publicRouter, response);

export default router;
