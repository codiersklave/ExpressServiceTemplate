import {ApiError} from "#errors/ApiError";

/**
 * Represents a validation error in the context of API interactions.
 * This error is typically thrown when input validation fails for a client request.
 * Inherits from the ApiError class.
 *
 * The ValidationError class is pre-configured with an HTTP status code of 400 (Bad Request),
 * indicating that the server cannot process the request due to client-side input issues.
 */
export class ValidationError extends ApiError {
  httpStatus = 400;
}