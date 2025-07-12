const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/index");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

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
