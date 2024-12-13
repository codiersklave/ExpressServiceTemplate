import {AuthError} from "#errors/AuthError";
import bcrypt from "bcrypt";
import db from "#models/index";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


/**
 * The AuthService class is responsible for handling user authentication logic.
 * It provides functionality to validate user credentials and issue authentication tokens.
 *
 * This class relies on external utilities and dependencies like database models, bcrypt for password hashing
 * validation, and JSON Web Tokens (JWT) for delivering secure access tokens to authenticated users.
 */
class AuthService {
  /**
   * Authenticates a user by validating their email and password.
   *
   * If validation is successful, returns a JSON Web Token (JWT).
   *
   * @function login
   * @async
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The password provided by the user for authentication.
   * @return {string} A JWT token signed with the user's ID and email, valid for 1 hour.
   * @throws {AuthError} If the user does not exist or credentials are invalid.
   */
  async login(email, password) {
    const user = await db.UserModel.findOne({where: {email, deletedAt: null}});
    if (!user) {
      throw new AuthError('Invalid credentials or user does not exist');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthError('Invalid credentials or user does not exist');
    }

    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
  }
}

export const authService = new AuthService();
