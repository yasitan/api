import { NextFunction, Request, Response } from 'express';
import { attachResponseData } from './utils/response';

export const getVersion = async (_: Request, res: Response, next: NextFunction) => {
  attachResponseData(res, { message: 'hello world', now: new Date().toString() });
  next();
};
