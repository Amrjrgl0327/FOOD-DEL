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
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

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

authRouter.get("/admin/dashboard", requireToken, requireAdmin, (res, req) => {
  res.statusCode(200).json({ message: "Welcome admin" });
});
