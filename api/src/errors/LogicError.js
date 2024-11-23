import {ApiError} from "#errors/ApiError";

export class LogicError extends ApiError {
  httpStatus = 400;
}