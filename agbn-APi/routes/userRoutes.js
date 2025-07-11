const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const register = require("../controllers/auth.controller");
const { registerUserSchema } = require("../utils/schema");

router.post("/register", validate(registerUserSchema), register);
// router.post("/login", login);
module.exports = router;
