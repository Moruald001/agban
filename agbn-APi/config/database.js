const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/agbnDb.sqlite",
});

module.exports = sequelize;
