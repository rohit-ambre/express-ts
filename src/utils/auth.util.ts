import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const comparePassword = async (
  enteredPwd: string,
  hashedPwd: string
) => {
  return compare(enteredPwd, hashedPwd);
};

export const createAccessToken = async (payload: object) => {
  const expiry: string = '15m';
  return sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
};
