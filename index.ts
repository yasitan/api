import express, { Express, Request, Response } from 'express';
import appRouter from './src/routes';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { getEnv } from './src/helpers/system';
import logger from './src/helpers/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// connect mongodb
connect(getEnv('APP_MONGODB_URI')).catch(err => {
  logger.info('🛑 DBG::Mongodb Can not connect to DB', err.message);
  process.exit(1);
});

app.get('/ver', (req: Request, res: Response) => {
  res.json({ build: process.env.BUILD_NUMBER, at: process.env.BUILD_DATE, version: process.env.BUILD_VERSION });
});

app.use('/', appRouter)

app.listen(port, () => {
  logger.info(`✅ [server]: Server is running at http://localhost:${port}`);
});
