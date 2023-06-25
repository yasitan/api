import { NextFunction, Request, Response } from 'express';
import { attachResponseData } from './utils/response';
import { getSample } from '../db/sample';

export const helloWorld = async (_: Request, res: Response, next: NextFunction) => {
  const sample = await getSample({});
  attachResponseData(res, { message: 'hello world', ...sample });
  next();
};
