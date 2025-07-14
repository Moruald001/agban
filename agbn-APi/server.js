const { sequelize } = require("./models/index");
const express = require("express");
const port = 5000;
const clientRoutes = require("./routes/clientRoutes");
const userRoutes = require("./routes/userRoutes");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoutes);
app.use("/client", clientRoutes);
app.use("/images", express.static("images"));

app.use((err, req, res, next) => {
  // 🛑 Erreurs Multer (ex: limite de taille, format invalide)
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "📦 Fichier trop volumineux (max 5 Mo)" });
    }
    return res.status(400).json({ message: `Erreur Multer : ${err.message}` });
  }

  // ❌ Erreur rejetée depuis fileFilter (ex: mauvais format MIME)
  if (err.message && err.message.includes("Seules les images")) {
    return res.status(400).json({ message: err.message });
  }
});

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
