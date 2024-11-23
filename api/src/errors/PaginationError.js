import {ApiError} from "#errors/ApiError";

export class PaginationError extends ApiError {
  httpStatus = 400;
}