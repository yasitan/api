import { Router } from 'express';
import { signIn, register } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/sign-in', signIn);

export default router;
