import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import jwtokenGenerator from "../utils/jwtokenGenerator.js";
import jwt from "jsonwebtoken";
import { json, where } from "sequelize";
import { sendLoginEmail } from "../utils/mailSender.js";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

//Creation d'un utilisateur
const register = async (req, res) => {
  const { name, email, role, password, ceo } = req.body;
  const protocol = req.protocol;
  const host = req.get("host");

  const backendUrl = `${protocol}://${host}`;

  try {
    const emailExist = await User.findOne({ where: { email } });

    if (emailExist) {
      return res.status(400).json({
        message: "Impossible de créer le compte, cet email existe déja.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role,
      ceo,
    });
    const token = jwtokenGenerator(user.id);
    sendLoginEmail(email, `${backendUrl}/auth/verify?token=${token}`);

    res.status(201).json({
      message: `Utilisateur créé, ${user.name},veuillez validez votre email`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: `Impossible de créer le compte.${error}` });
  }
};

//connection
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrect." });
    }
    // Compare les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrect." });
    }
    let collaborators = [];

    let ceoId;

    if (user.role === "ceo") {
      collaborators = await User.findAll({
        where: { ceo: user.name },
        attributes: ["id", "name", "role"],
      });
    } else if (user.role === "collaborateur") {
      ceoId = await User.findOne({
        where: { name: user.ceo },
        attributes: ["id"],
      });
    }
    // Générer un token JWT (fonction personnalisée)
    const token = jwtokenGenerator(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, //24h
    });

    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        name: user.name,
        ceoId: ceoId?.id,
        role: user.role,
        collaborators,
        ceoName: user.ceo,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Erreur dans /login :", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
//recuperation des ceos
const ceos = async (req, res) => {
  try {
    const ceos = await User.findAll({
      where: {
        role: "ceo",
      },
      attributes: ["id", "name"],
    });
    return res.status(200).json({
      message: "recuperation réussi",
      ceos,
    });
  } catch (error) {
    console.error("error lors de la recuperation des ceos :", error.message);
    return res.status(500).json("Erreur lors de la recuperation des ceo");
  }
};
//déconnexion
const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({ message: "Déconnecté avec succès." });
};

//email verification
const verificationEmailByUser = async (req, res) => {
  const { id } = req.params.id;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.update({ isVerified: true }, { where: { id: id } });

    res.status(201).json({ message: "email verifié" });
  } catch (err) {
    res.status(400).send("Lien invalide ou expiré");
  }
};
const verificationEmail = async (req, res) => {
  const { token } = req.query;

  try {
    console.log("entré");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.update(
      { isVerified: true },
      { where: { id: decoded.userId } }
    );

    res.redirect(`${process.env.FRONT_URL}/verify`);
  } catch (err) {
    res.status(400).send("Lien invalide ou expiré");
  }
};

export {
  register,
  login,
  logout,
  ceos,
  verificationEmail,
  verificationEmailByUser,
};
