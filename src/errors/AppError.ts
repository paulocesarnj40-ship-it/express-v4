class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    //linha comentada para indicar que a lógica original foi substituída
    //this.status = statusCode >= 500 ? 'error' : 'fail';
    this.status = 'error';
    this.isOperational = true;
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
