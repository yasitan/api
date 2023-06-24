import { Router } from 'express';
import { helloWorld } from '../middlewares/public'

const router = Router();


router.use('/hello-world', helloWorld);

export default router;
