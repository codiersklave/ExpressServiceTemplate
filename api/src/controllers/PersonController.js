import {personService} from "#services/personService";
import {NotFoundError} from "#errors/NotFoundError";
import {ValidationError} from "#errors/ValidationError";
import {LogicError} from "#errors/LogicError";
import {asyncHandler} from "#middlewares/asyncHandler";

export class PersonController {
  static createPerson = asyncHandler( async (req, res, next) => {
    const person = await personService.createPerson(req.body, req?.user);
    res.status(201).json(person);
  });

  static deletePerson = asyncHandler(async (req, res, next) => {
    const result = await personService.deletePerson(req.params.personId, req?.user);
    res.status(204).json();
  });

  static deletePersonHistory = asyncHandler(async (req, res, next) => {
    const result = await personService.deletePersonHistory(req.params.personId, req.params.version);
    res.status(204).json();
  });

  static fetchPersons = asyncHandler(async (req, res, next) => {
    const showDeleted = req.query.hasOwnProperty('showDeleted') && req.query.showDeleted === "1";
    const persons = await personService.fetchPersons({}, showDeleted);
    res.status(200).json({persons});
  });

  static fetchPersonsHistory = asyncHandler(async (req, res, next) => {
    const history = await personService.fetchPersonsHistory({});
    res.status(200).json({history});
  });

  static findPerson = asyncHandler(async (req, res, next) => {
    const showDeleted = req.query.hasOwnProperty('showDeleted') && req.query.showDeleted === "1";
    const person = await personService.findPerson(req.params.personId, showDeleted);
    res.status(200).json(person);
  });

  static fetchPersonHistory = asyncHandler(async (req, res, next) => {
    const history = await personService.findPersonHistory(req.params.personId);
    res.status(200).json({history});
  });

  static restorePersonHistory = asyncHandler(async (req, res, next) => {
    const person = await personService.restorePersonHistory(req.params.personId, req.params.version, req?.user);
    res.status(200).json(person);
  });

  static undeletePerson = asyncHandler(async (req, res, next) => {
    const person = await personService.undeletePerson(req.params.personId, req?.user);
    res.status(200).json(person);
  });

  static updatePerson = asyncHandler(async (req, res, next) => {
    const person = await personService.updatePerson(req.params.personId, req.body, req?.user);
    res.status(200).json(person);
  });
}
