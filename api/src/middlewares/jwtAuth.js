import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as process from "node:process";
import db from "#models/index";

dotenv.config();

/**
 * Middleware function to authenticate a JSON Web Token (JWT).
 *
 * Validates the token provided in the `Authorization` header of the request.
 * If the token is missing, expired, or invalid, a 401 Unauthorized response
 * is returned. If the token is valid, the corresponding user is retrieved
 * from the database and attached to the request object.
 *
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object
 * @param {Express.NextFunction} next - The next middleware function in the application stack.
 *
 * @throws {Object} 401 Unauthorized response if the token is missing or invalid.
 */
export const jwtAuth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Token missing'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.UserModel.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({error: 'Invalid token'});
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
