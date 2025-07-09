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
    dialect: "sqlite",
    storage: process.env.SQLITE_STORAGE || "./data/agbnDb.sqlite",
  },
};
