import { NextFunction, Request, Response } from 'express';
import LocalUserModel from '../db/local-user';
import LocalUser from '../models/local-user';
import { createUser, getUser } from '../db/user';
import { signToken, verifyToken } from '../helpers/jwt';
import { attachResponseData } from './utils/response';
import { pick } from 'lodash';
import passport from 'passport';
import User from '../models/user';
import AppError from '../helpers/error';

const getUserTokenPayload = (user: User) => ({ user: pick(user, ['_id', 'email']) });

export const register = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  LocalUserModel.register(new LocalUserModel({ email }), password, async (err: unknown, account: LocalUser) => {
    if (err) {
      return next(err);
    }

    const user = await createUser({ email: account.email });
    attachResponseData(res, { token: signToken({ id: user._id, payload: getUserTokenPayload(user) })});
    next();
  });
};

export const signIn = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('local', async (err: unknown, localUser: LocalUser) => {
    if (err) {
      return next(err);
    }

    if (!localUser) {
      return next(AppError.notFound('email is not found'));
    }

    const user = await getUser({ email: localUser.email });
    attachResponseData(res, { token: signToken({ id: user!._id, payload: getUserTokenPayload(user!) })});
    next();
  })(req, res, next);

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw AppError.unauthorized('Missing token');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw AppError.unauthorized('Missing token.');
    }

    const user = await verifyToken(token);
    if (!user) {
      throw AppError.unauthorized('Invalid token.');
    }

    req.user = user as Request['user'];

    next();
  } catch (error) {
    next(error);
  }
};
