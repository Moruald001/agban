const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const AccountCount = sequelize.define(
  "accountCount",
  {
    count: { type: DataTypes.NUMBER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const Client = sequelize.define(
  "client",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    contact: DataTypes.STRING,
    description: { type: DataTypes.TEXT, allowNull: false },
    keep: { type: DataTypes.BOOLEAN, allowNull: false },
    listId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

const List = sequelize.define(
  "list",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Img = sequelize.define(
  "img",
  {
    img: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
  }
);

List.hasMany(Client);
Client.belongsTo(List, {
  foreignKey: {
    name: "listId",
    allowNull: false,
  },
});

Client.hasMany(Img);
Img.belongsTo(Client, {
  onDelete: "CASCADE",
});

User.hasMany(List);
List.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

module.exports = { sequelize, List, Client, Img, AccountCount, User };
