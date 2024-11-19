import {personService} from "#services/personService";
import {NotFoundError} from "#errors/NotFoundError";
import {ValidationError} from "#errors/ValidationError";

export class PersonController {
  static async createPerson(req, res) {
    try {
      const person = await personService.createPerson(req.body);
      res.status(201).json(person);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.httpStatus).json({error: error.message});
      }

      res.status(500).json({error: error.message});
    }
  }

  static async deletePerson(req, res) {
    try {
      const result = await personService.deletePerson(req.params.personId);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({error: error.message, stack: error.stack});
    }
  }

  static async fetchPersons(req, res) {
    try {
      const persons = await personService.fetchPersons({});
      res.status(200).json({persons});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static async fetchPersonsHistory(req, res) {
    try {
      const history = await personService.fetchPersonsHistory({});
      res.status(200).json({history});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static async findPerson(req, res) {
    try {
      const person = await personService.findPerson(req.params.personId);
      res.status(200).json(person);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(error.httpStatus).json({error: error.message});
      }

      res.status(500).json({error: error.message});
    }
  }

  static async findPersonHistory(req, res) {
    try {
      const history = await personService.findPersonHistory(req.params.personId);
      res.status(200).json({history});
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(error.httpStatus).json({error: error.message});
      }
      
      res.status(500).json({error: error.message});
    }
  }

  static async updatePerson(req, res) {
    try {
      const person = await personService.updatePerson(req.params.personId, req.body);
      res.status(200).json(person);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(error.httpStatus).json({error: error.message});
      }

      if (error instanceof ValidationError) {
        return res.status(error.httpStatus).json({error: error.message});
      }

      res.status(500).json({error: error.message});
    }
  }
}
