import {ApiError} from "#errors/ApiError";

export class AuthError extends ApiError {
  httpStatus = 401;
}