import {authService} from "#services/authService";
import {asyncHandler} from "#utils/asyncHandler";

/**
 * AuthController handles user authentication-related actions.
 *
 * This class provides methods for handling authentication processes, including logging in users by verifying their credentials
 * and returning an authentication token to allow access to secured resources.
 */
export class AuthController {
  /**
   * Handles user login requests by authenticating provided email and password and returning a token.
   * Uses the `authService.login` method to authenticate the user and generate a token.
   * Expects the request body to include `email` and `password` fields.
   *
   * Upon successful authentication, responds with a status code of 200 and a JSON object containing the token.
   *
   * @function login
   * @async
   * @param {Object} req - The request object, containing `email` and `password` in the body.
   * @param {Object} res - The response object used to send back the token.
   * @param {Function} next - The next middleware function in the application's request-response cycle.
   */
  static login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const token = await authService.login(email, password);

    res.status(200).json({token});
  });
}
