import { NextFunction, Request, Response } from 'express';
import { attachResponseData } from './utils/response';
import { getUserId } from './utils/request';
import * as Conversation from '../db/conversation';
import * as Message from '../db/message';
import AppError from '../helpers/error';

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
