const limiter = require("express-rate-limit");

const loginRateLimiter = limiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginRateLimiter;
