import {userService} from "#services/userService";
import {ValidationError} from "#errors/ValidationError";
import {asyncHandler} from "#middlewares/asyncHandler";

export class UserController {
  static createUser = asyncHandler(async (req, res, next) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      createdBy: user.createdBy,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
      deletedAt: user.deletedAt,
      deletedBy: user.deletedBy,
    });
  });
}