import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

export const validate =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const mensagensDeErro = error.issues
          .map(
            (err) =>
              `${err.path.join('.').replace('body.', '')}: ${err.message}`,
          )
          .join(', ');
        res
          .status(400)
          .json({ error: `Falha na validação: ${mensagensDeErro}` });
      } else {
        next(error);
      }
    }
  };
