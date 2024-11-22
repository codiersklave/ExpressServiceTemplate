import {Router} from "express";
import {AuthController} from "#controllers/AuthController";

export const authRouter = () => {
  const router = Router();

  router.post('/auth', AuthController.login);

  return router;
}