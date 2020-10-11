import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import logger from '../../winston-config';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  logger.warn(`Validation Error on: '${req.url}'`);
  return res.status(422).json({
    status: false,
    message: 'Validation errors',
    error: extractedErrors
  });
};

export default validate;
