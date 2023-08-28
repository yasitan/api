import { Schema, model } from 'mongoose';
import { getCollectionName } from './utils/collection';
import { ID_DEFINITION, TIMESTAMPS } from './utils/schema';
import Conversation from '../models/conversation';
import { AnyKeys } from '../models/any-keys';

const ConversationSchema = new Schema<Conversation>({
  _id: ID_DEFINITION,
  title: String,
  userId: { type: String, required: true, index: true },

  createdAt: Number,
  updatedAt: Number
}, {
  versionKey: false,
  ...TIMESTAMPS
});

const collection =  model<Conversation>(getCollectionName('Conversation'), ConversationSchema);

export const getConversation = (condition: AnyKeys<Conversation>) =>
  collection.findOne(condition).lean();

export const getConversations = (condition: AnyKeys<Conversation>) =>
  collection.find(condition).sort({ createdAt: -1 }).lean();

export const createConversation = (user: AnyKeys<Conversation>) =>
  collection.create(user);
