import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const zodErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "validation failed",

      errorsMessage: {
        name: "ZodError",
        error: err.issues,
      },
    });
  }
  next(err);
};

export default zodErrorHandler;
