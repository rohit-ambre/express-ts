import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { body } from 'express-validator';
import User from '../entity/User';
import { comparePassword, createAccessToken } from '../utils/auth.util';
import logger from '../../winston-config';

export const validateRules = (method: string) => {
  switch (method) {
    case 'signup': {
      return [
        body('email')
          .exists()
          .withMessage('email does not exist')
          .isEmail()
          .withMessage('Invalid email'),
        body('password')
          .exists()
          .withMessage('password does not exist')
          .isLength({ min: 5 })
          .withMessage('must be at least 5 chars long'),
        body('firstName', 'enter first name').optional(),
        body('lastName', 'enter last name').optional()
      ];
    }
    case 'login': {
      return [
        body('email')
          .exists()
          .withMessage('email does not exist')
          .isEmail()
          .withMessage('Invalid email'),
        body('password').exists().withMessage('password does not exist')
      ];
    }
    default:
      return false;
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({ status: false, msg: 'User already exist' });
    }

    const newUser = userRepo.create(req.body);
    const results: User[] = await userRepo.save(newUser);

    return res
      .status(201)
      .json({ status: true, msg: 'User created successfully.', data: results });
  } catch (error) {
    logger.error(`error in User creation: ${error}`);
    return res
      .status(500)
      .json({ status: false, msg: 'something went wrong', data: null, error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: { email: req.body.email },
      select: ['id', 'password', 'email']
    });
    if (!user) {
      return res
        .status(200)
        .json({ status: false, msg: 'User does not exist' });
    }
    const valid: boolean = await comparePassword(
      req.body.password,
      user.password
    );
    if (valid) {
      const token = await createAccessToken({ userID: user.id });
      return res
        .status(200)
        .json({ status: true, msg: 'User successfully loggedIn', token });
    }
    return res.status(401).json({ status: false, msg: 'Wrong Password' });
  } catch (error) {
    logger.error(`error in User login: ${error}`);
    return res.status(500).json({ status: false, msg: 'something went wrong' });
  }
};
