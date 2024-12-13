/**
 * A utility function to handle asynchronous route handlers in Express.js.
 * It wraps an asynchronous function and ensures proper error handling by
 * passing any errors encountered to the next middleware in the chain.
 *
 * @param {Function} fn - The asynchronous function to be wrapped, typically
 *                        an Express.js route handler.
 * @returns {Function} - A middleware function that executes the asynchronous
 *                       function and handles any errors.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}
