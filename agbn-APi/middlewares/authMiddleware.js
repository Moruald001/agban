const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/index");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const authHeaderTable = authHeader.split(" ");
  const token = authHeaderTable[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    // Attacher l'utilisateur complet à la requête
    req.user = user;
    next();
  } catch (error) {
    console.log("Erreur Jwt : ", error.message);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

module.exports = authMiddleware;
