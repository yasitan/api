import { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';

// export a middleware function for handling response from res.locals.data
export const response = (_: Request, res: Response, next: NextFunction) => {
  res.json(res.locals.data);
  next();
};

export const attachResponseData = (res: Response, data: Record<string, unknown>) => {
  if (!res.locals.data) {
    res.locals.data = {};
  }
  Object.assign(res.locals.data, data);
};

export const attachSocket = (res: Response, io: Server) => {
  res.locals.socketIo = io;
};

export const getSocket = (res: Response) => res.locals.socketIo as Server;
