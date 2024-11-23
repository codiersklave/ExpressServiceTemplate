import {ApiError} from "#errors/ApiError";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.httpStatus).json({error: err.message});
  }

  return res.status(500).json({error: err.message});
}