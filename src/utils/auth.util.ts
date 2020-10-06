import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

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
