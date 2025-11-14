const { sequelize } = require("./models/index");
const express = require("express");
const port = 5001;
const clientRoutes = require("./routes/clientRoutes");
const userRoutes = require("./routes/authRoutes");
const multer = require("multer");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/images",
  express.static(path.join(__dirname, "images"), {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", " cross-origin");
    },
  })
);

app.use("/auth", userRoutes);
app.use("/client", clientRoutes);

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

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync();
      console.log("📦 Synchronisation des modèles terminée.");
    }
    app.listen(port, () => {
      console.log(`Serveur ecoute sur le port : ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
  }
}

main();
