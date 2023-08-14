import { Router } from 'express';
import { getCurrentUser } from '../middlewares/user';

const router = Router();

router.get('/me', getCurrentUser);

export default router;
