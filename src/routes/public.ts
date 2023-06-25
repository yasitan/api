import { Router } from 'express';
import { helloWorld } from '../middlewares/public'

const router = Router();


router.get('/hello-world', helloWorld);

export default router;
