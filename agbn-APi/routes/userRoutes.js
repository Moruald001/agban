const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { register, login } = require("../controllers/auth.controller");
const { registerUserSchema, loginSchema } = require("../utils/schema");
const loginRateLimiter = require("../middlewares/loginRateLimiter");

router.post("/register", validate(registerUserSchema), register);
router.post("/login", loginRateLimiter, validate(loginSchema), login);
module.exports = router;
