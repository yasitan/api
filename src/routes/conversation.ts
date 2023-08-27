import { Router } from 'express';
import { getConversations, getConvoMessages } from '../middlewares/conversation';

const router = Router();

router.get('/', getConversations);
router.get('/:id/messages', getConvoMessages);

export default router;
