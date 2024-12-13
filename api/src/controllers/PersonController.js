import {personService} from "#services/personService";
import {asyncHandler} from "#utils/asyncHandler";
import {addPaginationMeta} from "#utils/pagination";

/**
 * Controller responsible for handling operations related to the Person entity.
 *
 * This class includes methods for creating, deleting, restoring, and retrieving Person entities and their histories.
 * All methods are designed to return an appropriate HTTP response and are wrapped with asynchronous error-handling middleware.
 */
export class PersonController {
  /**
   * Asynchronous function to handle the creation of a new person entity.
   *
   * This function is wrapped with an async handler to manage asynchronous errors. It receives the request object
   * containing user and body data, forwards this information to the person service to create a new person,
   * and responds with a 201 HTTP status code and the created person entity as JSON.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function createPerson
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static createPerson = asyncHandler( async (req, res, next) => {
    const person = await personService.createPerson(req.body, req?.user);
    res.status(201).json(person);
  });

  /**
   * Deletes a person resource identified by the provided person ID.
   *
   * This function is an asynchronous handler that removes a specific person using their person ID, which is passed as
   * a parameter in the request. It retrieves the person ID from the request parameters and invokes the `deletePerson`
   * method from the personService to delete the resource.
   *
   * Upon successful deletion, the response is sent with a status code of 204 (No Content) without an empty body.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function deletePerson
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static deletePerson = asyncHandler(async (req, res, next) => {
    const result = await personService.deletePerson(req.params.personId, req?.user);
    res.status(204).json();
  });

  /**
   * Deletes the history record of a specific person using the provided person ID and version.
   *
   * This function utilizes the personService to perform the deletion operation. Sends a 204 No Content response upon
   * successful deletion.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function deletePersonHistory
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static deletePersonHistory = asyncHandler(async (req, res, next) => {
    const result = await personService.deletePersonHistory(req.params.personId, req.params.version);
    res.status(204).json();
  });

  /**
   * Asynchronous function to fetch a list of persons based on query parameters.
   *
   * Retrieves persons data from the database and includes pagination metadata within the response.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function fetchPersons
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static fetchPersons = asyncHandler(async (req, res, next) => {
    const showDeleted = req.query.hasOwnProperty('showDeleted') && req.query.showDeleted === "1";
    const {rows: persons, count} = await personService.fetchPersons({}, showDeleted, req.query);
    addPaginationMeta(req, res, persons, count);
    res.status(200).json({persons});
  });

  /**
   * Handles the retrieval of persons' history with pagination support.
   *
   * This asynchronous function fetches a paginated history of persons based on provided query parameters. It utilizes
   * a service to fetch the data and automatically attaches pagination metadata to the response. The result is then sent
   * back to the client as a JSON response.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function fetchPersonsHistory
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static fetchPersonsHistory = asyncHandler(async (req, res, next) => {
    const {rows: persons, count} = await personService.fetchPersonsHistory({}, req.query);
    addPaginationMeta(req, res, count);
    res.status(200).json({history: persons});
  });

  /**
   * Asynchronous function to find and retrieve person details based on the provided personId.
   *
   * This function processes an incoming request to find a person entity by its unique identifier and returns the
   * corresponding data in JSON format. It supports an optional query parameter `showDeleted` to include deleted
   * entities in the search.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function findPerson
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static findPerson = asyncHandler(async (req, res, next) => {
    const showDeleted = req.query.hasOwnProperty('showDeleted') && req.query.showDeleted === "1";
    const person = await personService.findPerson(req.params.personId, showDeleted);
    res.status(200).json(person);
  });

  /**
   * Fetches the history of a person based on their ID and query parameters.
   *
   * This function is an asynchronous handler that retrieves and returns the paginated history of a specific person from
   * the database.
   *
   * The function calls a service to fetch the person's history, including a count of total records, and attaches
   * pagination metadata to the response before sending it.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function fetchPersonHistory
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static fetchPersonHistory = asyncHandler(async (req, res, next) => {
    const {rows: history, count} = await personService.findPersonHistory(req.params.personId, req.query);
    addPaginationMeta(req, res, count);
    res.status(200).json({history});
  });

  /**
   * Restores the historical version of a person's information based on the provided person ID and version number.
   *
   * This function retrieves a specific historical version of a person's data from the service layer
   * and responds with the restored person object. It requires valid parameters and handles the restoration
   * asynchronously.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function restorePersonHistory
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static restorePersonHistory = asyncHandler(async (req, res, next) => {
    const person = await personService.restorePersonHistory(req.params.personId, req.params.version, req?.user);
    res.status(200).json(person);
  });

  /**
   * Asynchronously handles the restoration of a previously deleted person entity.
   *
   * This function utilizes an async handler to manage the process of undeleting a person based on the provided person
   * ID in the request parameters. It leverages the `personService.undeletePerson` method to restore the entity and
   * responds with the restored person's data in JSON format. The authenticated user's data can also be passed to the
   * service for additional authorization or logging purposes.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function undeletePerson
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static undeletePerson = asyncHandler(async (req, res, next) => {
    const person = await personService.undeletePerson(req.params.personId, req?.user);
    res.status(200).json(person);
  });

  /**
   * Asynchronous function to handle updating an existing person's details.
   *
   * Utilizes a service method to update the person data based on the provided request parameters.
   *
   * The function retrieves the person's ID from the request parameters (req.params.personId), the updated data from the
   * request body (req.body), and user context from the request object (req.user), passing them to the service layer for
   * processing.
   *
   * It sends a success response with a status code of 200 along with the updated person data in JSON format.
   *
   * Middleware is used to handle exceptions arising from the asynchronous operations.
   *
   * @function updatePerson
   * @async
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object
   * @param {Express.NextFunction} next - The next middleware function in the application stack.
   */
  static updatePerson = asyncHandler(async (req, res, next) => {
    const person = await personService.updatePerson(req.params.personId, req.body, req?.user);
    res.status(200).json(person);
  });
}
