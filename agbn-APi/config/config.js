require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./data/agbnDb.sqlite",
  },

  test: {
    dialect: "sqlite",
    storage: ":memory:",
  },

  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
