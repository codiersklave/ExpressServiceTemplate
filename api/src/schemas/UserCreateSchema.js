import Joi from "joi";
import {checkPastDateOnly} from "#schemas/helpers";

export const UserCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(80).required(),
});
