const multer = require("multer");
const { fileTypeFromBuffer } = require("file-type");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Seules les images (jpeg, png, webp) sont autorisées"), false);
  }

  // Vérifie le contenu réel du fichier (après upload) : chun₭ represente le premier bloc  de données
  file.stream.once("data", async (bloc) => {
    const type = await fileTypeFromBuffer(bloc);
    if (!type || !allowedTypes.includes(type.mime)) {
      return cb(
        new Error("Le contenu du fichier n'est pas une image valide"),
        false
      );
    }
    cb(null, true);
  });
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
