import { Router } from "express";
import {
  loginController,
  signUpController,
} from "../../controller/auth/auth.js";
console.log("router");
export const authRouter = Router();
console.log("hello router");
authRouter.post("/sign-up", signUpController);
authRouter.post("/login", loginController);
console.log("successs");
