import {authService} from "#services/authService";
import {asyncHandler} from "#middlewares/asyncHandler";

export class AuthController {
  static login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const token = await authService.login(email, password);

    res.status(200).json({token});
  });
}