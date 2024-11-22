import {Router} from "express";
import {UserController} from "#controllers/UserController";

export const userRouter = () => {
  const router = Router();

  router.post('/users', UserController.createUser);

  return router;
}
