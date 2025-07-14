const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"], // Mets ici l’URL de ton front
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOptions;
