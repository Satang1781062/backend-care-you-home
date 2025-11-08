const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("customer", "provider", "admin"), defaultValue: "customer" },
  phone: { type: DataTypes.STRING },
  profile_image: { type: DataTypes.STRING },
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
