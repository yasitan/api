import { Schema, model } from 'mongoose';
import { getCollectionName } from './utils/collection';
import { ID_DEFINITION, TIMESTAMPS } from './utils/schema';
import User from '../models/user';

const SampleSchema = new Schema<User>({
  _id: ID_DEFINITION,
  email: String,
  createdAt: Number,
  updatedAt: Number
}, {
  versionKey: false,
  ...TIMESTAMPS
});

const collection =  model<User>(getCollectionName('User'), SampleSchema);

export const getUser = (condition: Partial<Record<keyof User, unknown>>) => collection.findOne(condition).lean();

export const createUser = (user: Partial<Record<keyof User, unknown>>) => collection.create(user);
