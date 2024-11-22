import {Router} from "express";
import {PersonController} from "#controllers/PersonController";
import {jwtAuth} from "#middlewares/jwtAuth";

export const personRouter = () => {
  const router = Router();

  router.get('/persons', PersonController.fetchPersons);
  router.post('/persons', jwtAuth, PersonController.createPerson);
  router.delete('/persons/:personId', jwtAuth, PersonController.deletePerson);
  router.get('/persons/:personId', PersonController.findPerson);
  router.patch('/persons/:personId', jwtAuth, PersonController.updatePerson);
  router.patch('/persons/:personId/undelete', jwtAuth, PersonController.undeletePerson);

  router.get('/history/persons', jwtAuth, PersonController.fetchPersonsHistory);
  router.get('/history/persons/:personId', jwtAuth, PersonController.fetchPersonHistory);
  router.delete('/history/persons/:personId/:version', jwtAuth, PersonController.deletePersonHistory);
  router.patch('/history/persons/:personId/:version/restore', jwtAuth, PersonController.restorePersonHistory);

  return router;
}
