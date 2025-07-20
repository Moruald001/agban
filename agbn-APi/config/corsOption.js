const cors = require("cors");

const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  Credentials: true,
};

module.exports = corsOptions;
