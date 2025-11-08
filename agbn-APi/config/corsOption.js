const corsOptions = {
  origin: process.env.FRONT_URL, // ton front
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
