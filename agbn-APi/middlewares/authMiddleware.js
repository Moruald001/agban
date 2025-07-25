const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/index");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.status(401).json({ error: "Non authentifié" });

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
