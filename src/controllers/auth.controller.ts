import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

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
    return res
      .status(500)
      .json({ status: false, msg: 'something went wrong', data: null, error });
  }
};

export const login = (req: Request, res: Response) => {
  res.send('login');
};
