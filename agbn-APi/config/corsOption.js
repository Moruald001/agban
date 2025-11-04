const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // ton front
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // pour IE et certains navigateurs
};

module.exports = corsOptions;
