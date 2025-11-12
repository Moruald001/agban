const bcrypt = require("bcryptjs");
const { User, AccountCount } = require("../models");
const jwtokenGenerator = require("../utils/jwtokenGenerator");

//Creation d'un utilisateur
const register = async (req, res) => {
  const { name, email, role, password, ceo } = req.body;

  try {
    const emailExist = await User.findOne({ where: { email } });

    if (emailExist) {
      return res
        .status(400)
        .json({ message: "Impossible de créer le compte." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role,
      ceo,
    });

    res.status(201).json({ message: `Utilisateur créé, ${user.name}` });
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

    let ceoId ;

    if (user.role === "ceo") {
      collaborators = await User.findAll({
        where: { ceo: user.name },
        attributes: ["id", "name", "role"],
      })else if(user.role === "collaborateur") {
        ceoId = await User.findOne({
          where : {name : user.ceo},
          attributes : ["id"]
        })
      };
    }
    // Générer un token JWT (fonction personnalisée)
    const token = jwtokenGenerator(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, //24h
    });

    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        name: user.name,
        ceoId,
        role: user.role,
        collaborators,
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
    secure: false,
    sameSite: "Lax",
  });

  res.status(200).json({ message: "Déconnecté avec succès." });
};

module.exports = { register, login, logout, ceos };
