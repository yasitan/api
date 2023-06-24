import express, { Express, Request, Response } from 'express';
import appRouter from './src/routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/ver', (req: Request, res: Response) => {
  res.json({ build: process.env.BUILD_NUMBER, at: process.env.BUILD_DATE, version: process.env.BUILD_VERSION });
});

app.use('/', appRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
