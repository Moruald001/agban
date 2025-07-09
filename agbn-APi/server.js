// const routes = require("./routes");

const { sequelize } = require("./models/index");
const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

async function main() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base réussie.");

    await sequelize.sync({ alter: true });
    console.log("📦 Synchronisation des modèles terminée.");
    app.listen(port, () => {
      console.log(`Serveur demarré sur le port : ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
  }
}

main();
