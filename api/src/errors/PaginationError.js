import {ApiError} from "#errors/ApiError";

/**
 * Represents an error that occurs during pagination operations.
 *
 * This error is typically used to indicate that there is an issue
 * with the pagination parameters or process. It inherits from the
 * ApiError class, providing additional context specific to HTTP status
 * codes and pagination-related issues.
 *
 * The default HTTP status code for this error is 400 (Bad Request).
 */
export class PaginationError extends ApiError {
  httpStatus = 400;
}