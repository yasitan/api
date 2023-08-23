import { NextFunction, Request, Response } from 'express';
import { getUser } from '../db/user';
import { attachResponseData } from './utils/response';
import { getUserId } from './utils/request';

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUser({ _id: getUserId(req) });

  attachResponseData(res, { user });
  next();
};
