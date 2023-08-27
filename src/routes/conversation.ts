import { Router } from 'express';
import { chat, createConversation, getConversations, getConvoMessages } from '../middlewares/conversation';

const router = Router();

router.get('/', getConversations);
router.get('/:id/messages', getConvoMessages);
router.post('/', createConversation);

router.post('/:id/chat', chat);

export default router;
