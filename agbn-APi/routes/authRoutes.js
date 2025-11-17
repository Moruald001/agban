import express from "express";
import validate from "../middlewares/validate.js";
import {
  register,
  login,
  logout,
  ceos,
  verificationEmail,
  verificationEmailByUser,
} from "../controllers/auth.controller.js";
import { registerUserSchema, loginSchema } from "../utils/schema.js";
import loginRateLimiter from "../middlewares/loginRateLimiter.js";
import auth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", validate(registerUserSchema), register);
router.get("/ceos", ceos);
router.get("/verify", verificationEmail);
router.post("/profil/verify/:id", auth, verificationEmailByUser);
router.post("/login", loginRateLimiter, validate(loginSchema), login);
router.post("/logout", auth, logout);

export default router;
