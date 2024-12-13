import db from "#models/index";

/**
 * Middleware function to authenticate API requests using an API key.
 *
 * Validates the presence of the `x-api-key` header in the request, checks its validity
 * against stored API keys in the database, and attaches the corresponding client
 * object to the request if the key is valid.
 *
 * If the `x-api-key` header is missing or the provided API key is invalid, an error
 * response is sent with the appropriate HTTP status code.
 *
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object
 * @param {Express.NextFunction} next - The next middleware function in the application stack.
 *
 * @throws Will return a 401 status code with an error message if the API key is missing or invalid.
 * @throws Will return a 500 status code with an error message if an unexpected error occurs.
 */
const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({error: 'Missing API key'});
  }

  try {
    const client = await db.ClientModel.findOne({where: {apiKey}});
    if (!client) {
      return res.status(401).json({error: 'Invalid API key'});
    }
    req.client = client;
    next();
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

export { apiKeyAuth };
