import db from "#models/index";
import {NotFoundError} from "#errors/NotFoundError";
import {PersonCreateSchema} from "#schemas/PersonCreateSchema";
import {ValidationError} from "#errors/ValidationError";
import {PersonUpdateSchema} from "#schemas/PersonUpdateSchema";
import dayjs from "dayjs";

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

  async fetchPersons(options = {}) {
    if (Object.keys(options).length === 0) {
      options.where = {deleted: null};
    }
    return await db.PersonModel.findAll(options);
  }

  async fetchPersonsHistory(options = {}) {
    return await db.PersonHistoryModel.findAll(options);
  }

  async findPerson(id) {
    const person = await db.PersonModel.findByPk(id);

    if (!person) {
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

  async updatePerson(id, data) {
    const person = await db.PersonModel.findByPk(id);

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
