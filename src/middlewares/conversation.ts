import { NextFunction, Request, Response } from 'express';
import { attachResponseData, getSocket } from './utils/response';
import { getUserId } from './utils/request';
import * as Conversation from '../db/conversation';
import * as Message from '../db/message';
import AppError from '../helpers/error';
import uuid from '../helpers/uuid';
import { chat as askGpt } from '../integrations/openai';
import { sendMessage } from '../integrations/socket';

export const createConversation = async (req: Request, res: Response, next: NextFunction) => {
  // Default value, we will update it base on the first message from this conversation later
  const CODE_LENGTH = 5;
  const title = `Convo #${uuid().slice(0, CODE_LENGTH)}`;

  const conversation = await Conversation.createConversation({ title, userId: getUserId(req) });

  attachResponseData(res, { conversation });
  next();
};

export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  const conversations = await Conversation.getConversations({ userId: getUserId(req) });

  attachResponseData(res, { conversations });
  next();
};

export const getConvoMessages = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const conversation = await Conversation.getConversation({ _id: id, userId: getUserId(req) });
  if (!conversation) {
    return next(AppError.notFound('Conversation is not found'));
  }
  const messages = await Message.getHistoryMessages({ convoId: id });

  attachResponseData(res, { messages });
  next();
};

export const chat = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { message } = req.body;
  const userId = getUserId(req);
  const conversation = await Conversation.getConversation({ _id: id, userId });
  if (!conversation) {
    return next(AppError.notFound('Conversation is not found'));
  }

  const createdMessage = await Message.createMessage({ ...message, ownerId: getUserId(req), convoId: id });
  sendMessage(getSocket(res), userId, createdMessage);

  askGpt(
    // eslint-disable-next-line max-len
    'You are ChatGPT, your new AI assistant. Your user is seeking assistance and support. Provide helpful responses based on the following conversation:',
    [createdMessage]
  ).then(async text => {
    const botMessage = await Message.createMessage({ content: text, convoId: id });

    sendMessage(getSocket(res), userId, botMessage);
  });

  attachResponseData(res, { message: createdMessage });
  next();
};
