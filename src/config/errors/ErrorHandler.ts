import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { EntityNotFoundError } from 'typeorm';
import { AppError } from './AppError';
import { ExternalError } from './ExternalError';

class ErrorHandler {
  use(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err instanceof AppError || err instanceof ExternalError) {
      return res.status(err.statusCode).json(err.messageObj);
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.errors);
    }
    if (err instanceof EntityNotFoundError) {
      return res.status(404).json({
        errorMessage: 'Entity not found',
      });
    }

    return res.status(500).json(err || 'Internal server error');
  }
}

export default new ErrorHandler();
