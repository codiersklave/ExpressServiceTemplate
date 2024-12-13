import db from "#models/index";
import {NotFoundError} from "#errors/NotFoundError";
import {PersonCreateSchema} from "#schemas/PersonCreateSchema";
import {ValidationError} from "#errors/ValidationError";
import {PersonUpdateSchema} from "#schemas/PersonUpdateSchema";
import dayjs from "dayjs";
import {LogicError} from "#errors/LogicError";
import {applyPagination} from "#utils/pagination";

/**
 * A service class for managing and interacting with person records in a database.
 * This class provides methods to create, delete, restore, update, and query persons and their associated historical
 * records.
 */
class PersonService {
  /**
   * Creates a new person entry in the database after validating the provided data.
   * Optionally associates the entry with a `user` for tracking purposes.
   *
   * @param {Object} data - The data for the new person to be created. Must adhere to the PersonCreateSchema.
   * @param {Object|null} [user=null] - The user object used for associating creator and updater details (optional).
   * @returns {Promise<Object>} A promise that resolves to the newly created person record, including the associations if any.
   * @throws {ValidationError} Throws an error if the provided `data` fails validation.
   */
  async createPerson(data, user = null) {
    const validated = PersonCreateSchema.validate(data, { abortEarly: false });

    if (validated.error) {
      throw new ValidationError(validated.error.toString());
    }

    if (user) {
      data.createdBy = user.id;
      data.updatedBy = user.id;
    }

    const person = await db.PersonModel.create(data);

    await person.reload({
      include: [], // Include associations if necessary
      useMaster: true // Ensure the reload comes from the primary database
    });

    return person;
  }

  /**
   * Deletes a person from the database by marking them as deleted.
   *
   * @param {number|string} id - The unique identifier of the person to delete.
   * @param {object} [user=null] - Optional user object indicating who performed the deletion. If provided, the user ID is recorded.
   * @return {Promise<boolean>} - Returns a promise that resolves to true if the person was found and marked as deleted, or false if no matching person was found.
   */
  async deletePerson(id, user = null) {
    const person = await db.PersonModel.findByPk(id);

    if (person) {
      const data = {
        deletedAt: dayjs().format('YYYY-MM-DD HH:mm:ss.ms'),
      };

      if (user) {
        data.deletedBy = user.id;
      }

      await person.update(data);
      return true;
    }

    return false;
  }

  /**
   * Deletes a person's history record based on the provided id and version.
   *
   * @param {number|string} id - The unique identifier of the person history record to be deleted.
   * @param {number|string} version - The version of the person history record to be deleted.
   * @return {Promise<boolean>} A promise that resolves to true if the record was successfully deleted, or false if the record was not found.
   */
  async deletePersonHistory(id, version) {
    const personHistory = await db.PersonHistoryModel.findOne({where: {id, version}});

    if (personHistory) {
      await personHistory.destroy();
      return true;
    }

    return false;
  }

  /**
   * Fetches a list of persons from the database with optional filters, pagination, and deletion status.
   *
   * @param {Object} [options={}] - An object containing query options for fetching persons.
   * @param {boolean} [showDeleted=false] - A flag to include deleted persons in the results when true.
   * @param {Object} [query={}] - A query object to apply pagination settings.
   * @return {Promise<Object>} A promise that resolves to an object containing the list of persons and the total count.
   */
  async fetchPersons(options = {}, showDeleted = false, query = {}) {
    if (!showDeleted) {
      options.where = {deletedAt: null};
    }
    options = applyPagination(query, options);
    return await db.PersonModel.findAndCountAll(options);
  }

  /**
   * Fetches the history of persons based on the provided options and query parameters.
   *
   * @param {Object} [options={}] - Additional options for configuring the query, such as pagination or sorting.
   * @param {Object} [query={}] - Query parameters used to filter or modify the database search.
   * @return {Promise<Object>} A promise that resolves to an object containing the results and total count of matched records.
   */
  async fetchPersonsHistory(options = {}, query = {}) {
    options = applyPagination(query, options);
    return await db.PersonHistoryModel.findAndCountAll(options);
  }

  /**
   * Finds a person by their unique identifier.
   *
   * @param {number|string} id - The unique identifier of the person to find.
   * @param {boolean} [showDeleted=false] - A flag indicating whether to include deleted persons.
   * @return {Promise<Object>} A promise that resolves to the person object if found.
   * @throws {NotFoundError} Throws an error if the person does not exist or is deleted (when showDeleted is false).
   */
  async findPerson(id, showDeleted = false) {
    const person = await db.PersonModel.findByPk(id);

    if (!person || (!showDeleted && person.deletedAt !== null)) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    return person;
  }

  /**
   * Fetches the history of a person based on a provided ID and query parameters.
   *
   * @param {string} id - The unique identifier of the person whose history is to be retrieved.
   * @param {object} [query] - Optional query parameters for pagination or filtering. Defaults to an empty object.
   * @return {Promise<object>} A promise that resolves to an object containing the person's history and count.
   *                           Throws a NotFoundError if no history entries are found.
   */
  async findPersonHistory(id, query = {}) {
    let options = {where: {id}};
    options = applyPagination(query, options);
    const history = await db.PersonHistoryModel.findAndCountAll(options);

    if (history.length === 0) {
      throw new NotFoundError(`No history entries found for person ${id}`);
    }

    return history;
  }

  /**
   * Restores a person's attributes to a previous version from their history.
   *
   * @param {string|number} id The unique identifier of the person for which the history is being restored.
   * @param {number} version The version number of the history to restore.
   * @param {Object|null} [user=null] The user performing the action, used to track updates. Defaults to null if not provided.
   * @return {Promise<Object>} The updated person after restoration of the specified history version.
   * @throws {NotFoundError} If the person with the given ID does not exist.
   * @throws {NotFoundError} If the specified version of the person's history does not exist.
   */
  async restorePersonHistory(id, version, user = null) {
    const person = await db.PersonModel.findByPk(id);

    if (!person) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    const history = await db.PersonHistoryModel.findOne({where: {id, version}});

    if (!history) {
      throw new NotFoundError(`History version ${version} does not exist for person ${id}`);
    }

    const data = {
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
    };

    if (user) {
      data.updatedBy = user.id;
    }

    await person.update(data);

    await person.reload({
      include: [],
      useMaster: true,
    });

    return person;
  }

  /**
   * Restores a previously deleted person by setting their `deletedAt` and `deletedBy` fields to null.
   * Optionally updates the `updatedBy` field if a user is provided.
   *
   * @param {number|string} id - The unique identifier of the person to undelete.
   * @param {Object} [user] - An optional user object used to specify who performed the undelete action.
   * @param {number|string} user.id - The ID of the user performing the undelete action.
   * @throws {NotFoundError} If the person with the specified ID does not exist.
   * @throws {LogicError} If the person is not marked as deleted.
   * @return {Promise<Object>} A promise resolving to the updated person object.
   */
  async undeletePerson(id, user = null) {
    const person = await db.PersonModel.findOne({where: {id}});

    if (!person) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    if (person.deletedAt === null) {
      throw new LogicError(`Person ${id} is not deleted`);
    }

    const data = {
      deletedAt: null,
      deletedBy: null,
    };

    if (user) {
      data.updatedBy = user.id;
    }

    await person.update(data);

    await person.reload({
      include: [],
      useMaster: true,
    });

    return person;
  }

  /**
   * Updates a person's information in the database.
   *
   * @param {number|string} id - The unique identifier of the person to update.
   * @param {Object} data - The updated data for the person.
   * @param {Object|null} [user=null] - Optional user performing the update; used to log who updated the record.
   * @return {Promise<Object>} The updated person record.
   * @throws {NotFoundError} If the person with the given ID does not exist.
   * @throws {ValidationError} If the provided data fails validation.
   */
  async updatePerson(id, data, user = null) {
    const person = await db.PersonModel.findOne({where: {id, deletedAt: null}});

    if (!person) {
      throw new NotFoundError(`Person ${id} does not exist`);
    }

    const validated = PersonUpdateSchema.validate(data, { abortEarly: false });

    if (validated.error) {
      throw new ValidationError(validated.error.toString());
    }

    if (user) {
      data.updatedBy = user.id;
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
