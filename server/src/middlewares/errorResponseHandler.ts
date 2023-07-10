import * as express from 'express';
import { ErrorRequestHandler } from 'express'

interface Error {
    statusCode?: number;
    message: string,
    stack: string
}
export const errorResponseHandler: ErrorRequestHandler = (err : Error, req: express.Request, res: express.Response, next: express.NextFunction) => {

const statusCode = err.statusCode || 400;
  res.status(statusCode || 400).json({
    message: err.message,
    stack:  process.env.NODE_ENV === "production" ? null  : err.stack,
  })
}

export const invalidPathHandler= ( req: express.Request, res: express.Response, next: express.NextFunction) => {
    let error = new Error("Invalid Path");
    res.status(404);
    next(error);
  };

