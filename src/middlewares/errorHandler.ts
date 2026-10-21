import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  ///console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // If the error is not an AppError, return a generic 500 error response
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
