const bcrypt = require("bcryptjs");
const { User, AccountCount } = require("../models");
const accountCountIncrementer = require("../utils/accounCountIncrementer");
const jwtokenGenerator = require("../utils/jwtokenGenerator");

//Creation d'un utilisateur
const register = async (req, res) => {
  const { name, email, role, password } = req.body;
  console.log(role);

  try {
    const emailExist = await User.findOne({ where: { email } });
    const count = await AccountCount.findByPk(1);
    const countLimit = count?.count;

    if (emailExist || (countLimit && countLimit === 3)) {
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
    });
    if (user) {
      await accountCountIncrementer();
    }
    res.status(201).json({ message: `Utilisateur créé, ${user.name}` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errors: "Erreur lors de la création de l'utilisateur" });
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
    // Générer un token JWT (fonction personnalisée)
    const token = jwtokenGenerator(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, //24h
    });
    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur dans /login :", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

module.exports = { register, login };
