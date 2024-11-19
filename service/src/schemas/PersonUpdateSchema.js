import Joi from "joi";
import {checkPastDateOnly} from "#schemas/helpers";

export const PersonUpdateSchema = Joi.object({
  familyName: Joi.string().min(1).max(80),
  givenName: Joi.string().min(1).max(80),
  middleName: Joi.string().min(1).max(80),
  birthName: Joi.string().min(1).max(80),
  maternalName: Joi.string().min(1).max(80),
  honPrefixes: Joi.string().min(1).max(160),
  honSuffixes: Joi.string().min(1).max(160),
  dateOfBirth: Joi.string().custom(checkPastDateOnly),
  deleted: Joi.date(),
});
