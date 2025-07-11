const jwt = require("jsonwebtoken");
require("dotenv").config;

const jwtokenGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};

module.exports = jwtokenGenerator;
