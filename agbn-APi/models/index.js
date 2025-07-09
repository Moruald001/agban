const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Client = sequelize.define(
  "client",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    contact: DataTypes.STRING,
    description: { type: DataTypes.TEXT, allowNull: false },
    keep: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    timestamps: true,
  }
);

const List = sequelize.define(
  "list",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

const Img = sequelize.define(
  "img",
  {
    img: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: false,
  }
);
List.hasMany(Client);
Client.belongsTo(List);

Client.hasMany(Img);
Img.belongsTo(Client);

module.exports = { sequelize, List, Client, Img };
