require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: process.env.SQLITE_STORAGE || "./data/agbnDb.sqlite",
  },

  test: {
    dialect: "sqlite",
    storage: ":memory:",
  },

  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL, // Railway fournit DATABASE_URL automatiquement si tu l'ajoutes dans Variables
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
