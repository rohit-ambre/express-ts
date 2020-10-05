import { Request, Response } from 'express';

export const signup = (req: Request, res: Response) => {
  res.send('signup');
};

export const login = (req: Request, res: Response) => {
  res.send('login');
};
