import { Schema, model } from 'mongoose';
import { getCollectionName } from './utils/collection';
import Sample from '../models/sample';

const SampleSchema = new Schema<Sample>({
  _id: String,
  name: String,
  createdAt: Number,
  updatedAt: Number
}, {
  versionKey: false,
  timestamps: true
});

const collection =  model<Sample>(getCollectionName('Sample'), SampleSchema);

export const getSample = (condition: Partial<Record<keyof Sample, unknown>>) => collection.findOne(condition).lean();
