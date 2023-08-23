import { Router } from 'express';
import { getVersion } from '../middlewares/public';

const router = Router();


router.get('/ver', getVersion);

export default router;
