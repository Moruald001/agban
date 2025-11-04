const cors = require("cors");

const corsOptions = {
  // origin: "http://localhost:5173", // ton front
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // pour IE et certains navigateurs
};

module.exports = corsOptions;
