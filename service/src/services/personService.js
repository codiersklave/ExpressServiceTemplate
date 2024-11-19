import db from "#models/index";
import {NotFoundError} from "#errors/NotFoundError";
import {PersonCreateSchema} from "#schemas/PersonCreateSchema";
import {ValidationError} from "#errors/ValidationError";
import {PersonUpdateSchema} from "#schemas/PersonUpdateSchema";
import dayjs from "dayjs";
import {LogicError} from "#errors/LogicError";

class PersonService {
  async createPerson(data) {
    const validated = PersonCreateSchema.validate(data, { abortEarly: false });

    if (validated.error) {
      throw new ValidationError(validated.error.toString());
    }

    const person = await db.PersonModel.create(data);

    await person.reload({
      include: [], // Include associations if necessary
      useMaster: true // Ensure the reload comes from the primary database
    });

    return person;
  }

  async deletePerson(id) {
    const person = await db.PersonModel.findByPk(id);

    if (person) {
      await person.update({deleted: dayjs().format('YYYY-MM-DD HH:mm:ss.ms')});
      return true;
    }

    return false;
  }

  async deletePersonHistory(id, version) {
    const personHistory = await db.PersonHistoryModel.findOne({where: {id, version}});

    if (personHistory) {
      await personHistory.destroy();
      return true;
    }

    return false;
  }

  async fetchPersons(options = {}, showDeleted = false) {
    if (!showDeleted) {
      options.where = {deleted: null};
    }
    return await db.PersonModel.findAll(options);
  }

  async fetchPersonsHistory(options = {}) {
    return await db.PersonHistoryModel.findAll(options);
  }

  async findPerson(id, showDeleted = false) {
    const person = await db.PersonModel.findByPk(id);

    if (!person || (!showDeleted && person.deleted !== null)) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    return person;
  }

  async findPersonHistory(id) {
    const history = await db.PersonHistoryModel.findAll({where: {id}});

    if (history.length === 0) {
      throw new NotFoundError(`No history entries found for person ${id}`);
    }

    return history;
  }

  async restorePersonHistory(id, version) {
    const person = await db.PersonModel.findByPk(id);

    if (!person) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    const history = await db.PersonHistoryModel.findOne({where: {id, version}});

    if (!history) {
      throw new NotFoundError(`History version ${version} does not exist for person ${id}`);
    }

    await person.update({
      baseVersion: version,
      familyName: history.familyName,
      givenName: history.givenName,
      middleName: history.middleName,
      birthName: history.birthName,
      maternalName: history.maternalName,
      honPrefixes: history.honPrefixes,
      honSuffixes: history.honSuffixes,
      dateOfBirth: history.dateOfBirth,
      deleted: history.deleted,
    });

    await person.reload({
      include: [],
      useMaster: true,
    });

    return person;
  }

  async undeletePerson(id) {
    const person = await db.PersonModel.findOne({where: {id}});

    if (!person) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    if (person.deleted === null) {
      throw new LogicError(`Person ${id} is not deleted`);
    }

    await person.update({deleted: null});

    await person.reload({
      include: [],
      useMaster: true,
    });

    return person;
  }

  async updatePerson(id, data) {
    const person = await db.PersonModel.findOne({where: {id, deleted: null}});

    if (!person) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    const validated = PersonUpdateSchema.validate(data, { abortEarly: false });

    if (validated.error) {
      throw new ValidationError(validated.error.toString());
    }

    await person.update(data);

    await person.reload({
      include: [],
      useMaster: true,
    });

    return person;
  }
}

export const personService = new PersonService();
