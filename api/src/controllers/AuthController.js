import {authService} from "#services/authService";
import {AuthError} from "#errors/AuthError";

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(error.httpStatus).json({error: 'Unauthorized'});
      }

      res.status(500).json({error: error.message});
    }
  }
}