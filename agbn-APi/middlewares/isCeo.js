const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/index");

const isCeoMiddleware = async (req, res, next) => {
  const user = req.user;

  if (req.user.role !== "ceo") {
    return res.status(400).json({ error: "Action non authorisé" });
  }
  next();
};

module.exports = isCeoMiddleware;
