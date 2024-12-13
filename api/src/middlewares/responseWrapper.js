/**
 * Middleware function to wrap API responses.
 *
 * This function overrides the `res.json` method to standardize the structure
 * of JSON responses. If the response data does not include an `error` property,
 * it wraps the data in an object with `meta` (if available) and `payload` properties.
 * If the response data includes an `error` property, it is returned unmodified.
 *
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object
 * @param {Express.NextFunction} next - The next middleware function in the application stack.
 */
export const responseWrapper = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    let wrappedData = data;
    if (!data?.hasOwnProperty('error')) {
      wrappedData = {};

      if (res?.meta) {
        wrappedData.meta = res.meta;
      }

      wrappedData.payload = data;
    }

    return originalJson.call(this, wrappedData);
  }

  next();
}
