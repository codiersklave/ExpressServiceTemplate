import {ApiError} from "#errors/ApiError";

export class NotFoundError extends ApiError {
  httpStatus = 404;
}