import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const users: User[] = await userRepo.find({});
    return res
      .status(200)
      .json({ status: true, msg: 'list of all users', data: users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: 'something went wrong', error });
  }
};

export default getAllUsers;
