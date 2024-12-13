/**
 * Represents an API error that extends the standard JavaScript Error object.
 *
 * This class is used to encapsulate errors that occur during API operations, providing additional context such as an
 * HTTP status code.
 *
 * @class
 * @extends Error
 *
 * @property {number} httpStatus The HTTP status code associated with the error. Default is 500.
 */
export class ApiError extends Error {
  httpStatus = 500;
}