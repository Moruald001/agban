const bcrypt = require("bcryptjs");
const { User, AccountCount } = require("../models");
const accountCountIncrementer = require("../utils/accounCountIncrementer");

//Creation d'un utilisateur
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) {
    return res.status(400).json({ message: "Email déjà utilisé." });
  }

  const count = await AccountCount.findByPk(1);
  const countLimit = count?.count;

  if (countLimit && countLimit === 3) {
    return res.status(403).json({
      message:
        "Vous ne pouvez plus vous inscrire , le nombre de compte necessaire est déjà atteint",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      const message = await accountCountIncrementer();
      console.log(message);
    }
    console.log("Utilisateur crée");
    res.status(201).json({ message: `Utilisateur crée, ${user.name}` });
  } catch (error) {
    res
      .status(500)
      .json({ errors: "Erreur lors de la creation de l'utilisateur", error });
  }
};

module.exports = register;
//connection
