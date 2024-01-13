import { NextFunction, Response, Request } from 'express';
import { ExtendedRequest } from './types';
import { AUTH_LIST, secretKey } from './data';
import jwt from 'jsonwebtoken';

/**
 * Guard middleware to check if user has been logged in
 */
export function isLoggedIn(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.isLoggedIn) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access forbidden',
  });
}

/**
 * Decode JWT token send in Authorization header
 */
export function decodeJWT(
  req: Request<any, any, any, ExtendedRequest>,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, secretKey, (err, payload) => {
    if (err || typeof payload === 'string') {
      return next();
    }

    // Extract id from JWT payload
    const id = payload?.id as string | undefined;

    if (typeof id === 'string') {
      const foundUser = AUTH_LIST.find((user) => user.id === id);

      if (foundUser) {
        req.isLoggedIn = true;
        req.user = foundUser;
      }
    }

    return next();
  });
}

