const corsOptions = {
  origin: (origin, callback) => {
    // autorise toutes les origines dynamiquement
    callback(null, origin || true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
