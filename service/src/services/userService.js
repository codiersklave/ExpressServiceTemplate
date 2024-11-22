import {UserCreateSchema} from "#schemas/UserCreateSchema";
import {ValidationError} from "#errors/ValidationError";
import db from "#models/index";

class UserService {
  async createUser(data) {
    const validated = UserCreateSchema.validate(data, {abortEarly: false});

    if (validated.error) {
      throw new ValidationError(validated.error.toString());
    }

    const user = await db.UserModel.create(data);

    await user.reload({
      include: [], // Include associations if necessary
      useMaster: true // Ensure the reload comes from the primary database
    });

    return user;
  }
}

export const userService = new UserService();
