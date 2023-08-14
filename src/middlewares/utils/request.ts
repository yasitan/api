import { Request } from 'express';

export const getUserId = (req: Request) => req.user._id;
