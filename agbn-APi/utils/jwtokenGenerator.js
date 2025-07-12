require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtokenGenerator = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET est manquant dans .env");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "1d" });
};

module.exports = jwtokenGenerator;
