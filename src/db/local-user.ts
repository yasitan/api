import { Schema, model } from 'mongoose';
import { getCollectionName } from './utils/collection';
// import LocalUser from '../models/local-user';
import { ID_DEFINITION, TIMESTAMPS } from './utils/schema';

import passportLocalMongoose from 'passport-local-mongoose';
import LocalUser from '../models/local-user';

const LocalUserSchema = new Schema<LocalUser>({
  _id: ID_DEFINITION,
  email: { type: String, unique: true },
  createdAt: Number,
  updatedAt: Number
}, {
  versionKey: false,
  ...TIMESTAMPS
});

LocalUserSchema.plugin(
  passportLocalMongoose,
  {
    usernameField: 'email',
    lastLoginField: 'lastLogin',
    usernameLowerCase: true,
    limitAttempts: true,
    maxAttempts: 10
  });

const collection =  model(getCollectionName('LocalUser'), LocalUserSchema);

export default collection;

export const getLocalUser = (condition: Partial<Record<keyof LocalUser, unknown>>) => collection.findOne(condition).lean();
