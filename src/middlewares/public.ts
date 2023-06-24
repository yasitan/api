import { Request, Response } from "express";

export const helloWorld = (_: Request, res: Response) => {
  res.json({ message: 'hello world' });
}
