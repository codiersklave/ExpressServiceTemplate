import {userService} from "#services/userService";
import {ValidationError} from "#errors/ValidationError";

export class UserController {
  static async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        email: user.email,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.httpStatus).json({error: error.message});
      }

      res.status(500).json({error: error.message});
    }
  }
}