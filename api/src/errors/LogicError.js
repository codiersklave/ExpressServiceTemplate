import {ApiError} from "#errors/ApiError";

/**
 * Represents a logic error that occurs when the program encounters an invalid operation or state.
 * Extends the ApiError class and is used to signal application-specific issues with logic or business rules.
 *
 * This error corresponds to an HTTP status of 400 (Bad Request) by default.
 *
 * Typically used to denote client-side mistakes or invalid input that violates application logic.
 */
export class LogicError extends ApiError {
  httpStatus = 400;
}