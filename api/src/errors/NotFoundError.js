import {ApiError} from "#errors/ApiError";

/**
 * Represents a not found error, which is a subclass of the ApiError class.
 * Typically used when a requested resource cannot be found.
 *
 * This error includes a default HTTP status code of 404 to indicate
 * a "Not Found" server response.
 */
export class NotFoundError extends ApiError {
  httpStatus = 404;
}