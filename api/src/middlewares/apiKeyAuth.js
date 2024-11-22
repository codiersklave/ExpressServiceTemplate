import db from "#models/index";

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
