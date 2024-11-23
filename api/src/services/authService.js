import {AuthError} from "#errors/AuthError";
import bcrypt from "bcrypt";
import db from "#models/index";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


class AuthService {
  async login(email, password) {
    const user = await db.UserModel.findOne({where: {email, deletedAt: null}});
    if (!user) {
      throw new AuthError();
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthError();
    }

    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
  }
}

export const authService = new AuthService();
