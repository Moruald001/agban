const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { register, login, logout } = require("../controllers/auth.controller");
const { registerUserSchema, loginSchema } = require("../utils/schema");
const loginRateLimiter = require("../middlewares/loginRateLimiter");

router.post("/register", validate(registerUserSchema), register);
router.post("/login", loginRateLimiter, validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
