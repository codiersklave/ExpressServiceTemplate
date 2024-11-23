import {ApiError} from "#errors/ApiError";

export class ValidationError extends ApiError {
  httpStatus = 400;
}