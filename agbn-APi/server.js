const { sequelize } = require("./models/index");
const express = require("express");
const app = express();
const port = 5000;
const clientRoutes = require("./routes/clientRoutes");
app.use(express.json());

app.use("/client", clientRoutes);
app.get("/", (req, res) => {
  res.json({ message: "serveur demarré" });
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base réussie.");

    await sequelize.sync();
    console.log("📦 Synchronisation des modèles terminée.");
    app.listen(port, () => {
      console.log(`Serveur demarré sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
  }
}

main();
