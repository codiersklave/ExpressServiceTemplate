import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as process from "node:process";
import db from "#models/index";

dotenv.config();

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
