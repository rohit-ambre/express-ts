import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import logger from '../../winston-config';

/**
 * compare entered password with user's password
 * @param enteredPwd user entered password
 * @param hashedPwd hashed password from DB
 * @returns promise
 */
export const comparePassword = async (
  enteredPwd: string,
  hashedPwd: string
) => {
  return compare(enteredPwd, hashedPwd);
};

/**
 * created JWT token from payload
 * @param payload to be saved in JWT token
 * @returns promise
 */
export const createAccessToken = async (payload: object) => {
  const expiry: string = '15m';
  return sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
};

/**
 * middleware function to verify JWT token
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
) => {
  const token: string = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ status: false, msg: 'Token is required' });
  }
  try {
    const data = verify(token, process.env.JWT_SECRET);
    req.token = data;
    next();
  } catch (error) {
    logger.error(`error verifying token: ${error}`);
    return res
      .status(500)
      .json({ status: false, msg: 'something went wrong', error });
  }
};
