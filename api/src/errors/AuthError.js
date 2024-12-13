import {ApiError} from "#errors/ApiError";

/**
 * Represents an authentication-specific error.
 *
 * This class extends the ApiError class and is used to indicate errors related to authentication failure.
 *
 * The HTTP status code for this error is set to 401 by default, which corresponds to an unauthorized access attempt.
 *
 * Use this class to signal authentication errors in your application, such as invalid credentials or missing
 * authentication tokens.
 */
export class AuthError extends ApiError {
  httpStatus = 401;
}