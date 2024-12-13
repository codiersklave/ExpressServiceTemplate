import {UserCreateSchema} from "#schemas/UserCreateSchema";
import {ValidationError} from "#errors/ValidationError";
import db from "#models/index";

/**
 * Provides services related to user management, including creating and managing user records.
 */
class UserService {
  /**
   * Creates a new user record in the database after validating the input data.
   *
   * @param {Object} data - The data to create a new user, must conform to the required schema.
   * @return {Promise<Object>} A promise that resolves to the created user object, including its properties after being reloaded.
   * @throws {ValidationError} If the provided data fails schema validation.
   */
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
