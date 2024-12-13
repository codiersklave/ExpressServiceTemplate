import {userService} from "#services/userService";
import {asyncHandler} from "#utils/asyncHandler";

export class UserController {
  /**
   * Handles the creation of a new user.
   *
   * This asynchronous function processes the user's request to create a new user. It leverages
   * the `userService.createUser` method to persist the user's data. Upon successful creation,
   * it sends a JSON response containing the user's details such as ID, email, and timestamps
   * for creation, updates, and deletions.
   *
   * Errors are passed to the next middleware for handling.
   *
   * @function createUser
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   * @returns {void}
   */
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