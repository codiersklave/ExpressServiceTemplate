import {ApiError} from "#errors/ApiError";

/**
 * Middleware function to handle errors in the application.
 *
 * @param {Object} err - Error object containing details about the error.
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object
 * @param {Express.NextFunction} next - The next middleware function in the application stack.
 *
 * This function checks if the passed error is an instance of ApiError.
 * If true, it sends a response with the specific HTTP status and error message.
 * For other types of errors, it defaults to a 500 status code with the error message.
 */
export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.httpStatus).json({error: err.message});
  }

  return res.status(500).json({error: err.message});
}