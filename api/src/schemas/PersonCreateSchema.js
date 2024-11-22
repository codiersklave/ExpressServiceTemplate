import Joi from "joi";
import {checkPastDateOnly} from "#schemas/helpers";

export const PersonCreateSchema = Joi.object({
  familyName: Joi.string().min(1).max(80).allow(null),
  givenName: Joi.string().min(1).max(80).allow(null),
  middleName: Joi.string().min(1).max(80).allow(null),
  birthName: Joi.string().min(1).max(80).allow(null),
  maternalName: Joi.string().min(1).max(80).allow(null),
  honPrefixes: Joi.string().min(1).max(160).allow(null),
  honSuffixes: Joi.string().min(1).max(160).allow(null),
  dateOfBirth: Joi.string().custom(checkPastDateOnly).allow(null),
  deleted: Joi.date().allow(null),
}).custom((value, helpers) => {
  if (!value.familyName && !value.givenName) {
    return helpers.message('At least one of familyName or givenName must be provided');
  }

  return value;
});
