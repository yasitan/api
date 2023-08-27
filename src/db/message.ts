import { AnyKeys, Schema, model } from 'mongoose';
import { getCollectionName } from './utils/collection';
import { ID_DEFINITION, TIMESTAMPS } from './utils/schema';
import Message from '../models/message';

const MessageSchema = new Schema<Message>({
  _id: ID_DEFINITION,
  ownerId: String,
  convoId: { type: String, index: true, required: true },
  content: String,

  createdAt: { type: Number, index: -1 },
  updatedAt: Number
}, {
  versionKey: false,
  ...TIMESTAMPS
});

const collection =  model<Message>(getCollectionName('Message'), MessageSchema);

export const getHistoryMessages = (condition: AnyKeys<Message>) =>
  collection.find(condition).sort({ createdAt: -1 }).lean();

export const createMessage = (message: AnyKeys<Message>) =>
  collection.create(message);
