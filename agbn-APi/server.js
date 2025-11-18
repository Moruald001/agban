import express from "express";
import { sequelize } from "./models/index.js";
import clientRoutes from "./routes/clientRoutes.js";
import userRoutes from "./routes/authRoutes.js";
import multer from "multer";
import cors from "cors";
import corsOptions from "./config/corsOption.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const port = 5001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

// Routes
app.use("/auth", userRoutes);
app.use("/client", clientRoutes);

// Middleware erreurs (ex: Multer)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Fichier trop volumineux (max 5 Mo)" });
    }
    return res.status(400).json({ message: `Erreur Multer : ${err.message}` });
  }

  if (err.message && err.message.includes("Seules les images")) {
    return res.status(400).json({ message: err.message });
  }

  next(err);
});

// Route test
app.get("/", (req, res) => {
  res.json({ message: "serveur démarré" });
});

// Lancement serveur + DB
async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connexion DB réussie.");

    await sequelize.sync();
    console.log("Synchronisation modèles OK.");

    app.listen(port, () => {
      console.log(`Serveur écoute sur le port : ${port}`);
    });
  } catch (error) {
    console.error("Erreur DB :", error);
  }
}

main();
