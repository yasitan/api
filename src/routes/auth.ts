import { Router } from 'express';
import { signIn, register, verify } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/sign-in', signIn);
router.post('/verify', verify);

export default router;
