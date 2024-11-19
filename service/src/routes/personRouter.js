import {Router} from "express";
import {PersonController} from "#controllers/PersonController";

export const personRouter = () => {
  const router = Router();

  router.get('/persons', PersonController.fetchPersons);
  router.post('/persons', PersonController.createPerson);
  router.delete('/persons/:personId', PersonController.deletePerson);
  router.get('/persons/:personId', PersonController.findPerson);
  router.patch('/persons/:personId', PersonController.updatePerson);
  router.patch('/persons/:personId/undelete', PersonController.undeletePerson);

  router.get('/history/persons', PersonController.fetchPersonsHistory);
  router.get('/history/persons/:personId', PersonController.fetchPersonHistory);
  router.delete('/history/persons/:personId/:version', PersonController.deletePersonHistory);
  router.patch('/history/persons/:personId/:version/restore', PersonController.restorePersonHistory);

  return router;
}
