const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  register,
  login,
  logout,
  ceos,
  verificationEmail,
} = require("../controllers/auth.controller");
const { registerUserSchema, loginSchema } = require("../utils/schema");
const loginRateLimiter = require("../middlewares/loginRateLimiter");
const auth = require("../middlewares/authMiddleware");

router.post("/register", validate(registerUserSchema), register);
router.get("/ceos", ceos);
router.post("/verify", verificationEmail);
router.post("/login", loginRateLimiter, validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
