import { nowMs } from '../../helpers/datetime';
import uuid from '../../helpers/uuid';

export const ID_DEFINITION = { type: String, default: () => uuid(), required: true };

export const TIMESTAMPS = {
  timestamps: { currentTime: () => nowMs() },
};
