// const routes = require("./routes");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("./models/index");
const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

// const dbDir = path.resolve(__dirname, "data");
// if (!fs.existsSync(dbDir)) {
//   fs.mkdirSync(dbDir);
// }

// app.use("/", routes);

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
