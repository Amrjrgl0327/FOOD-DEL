import { Router } from "express";
import {
  loginController,
  signUpController,
} from "../../controller/auth/auth.js";
import {
  validateEmail,
  checkIfUserExist,
  validateEmailAndPassword,
} from "../../middleware/auth-middleware.js";

export const authRouter = Router();

authRouter.post(
  "/sign-up",
  validateEmailAndPassword,
  validateEmail,
  signUpController,
);
authRouter.post(
  "/login",
  validateEmailAndPassword,
  checkIfUserExist,
  loginController,
);
