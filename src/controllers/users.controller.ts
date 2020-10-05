import { Request, Response } from 'express';

const getAllUsers = (req: Request, res: Response) => {
  res.send('users');
};

export default getAllUsers;
