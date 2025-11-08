const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProviderProfile = sequelize.define('ProviderProfile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  nickname: { type: DataTypes.STRING },
  full_name: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
  gender: { type: DataTypes.ENUM('ชาย', 'หญิง', 'อื่นๆ') },
  position: { type: DataTypes.STRING },
  work_type: { type: DataTypes.ENUM('FULL TIME', 'PART TIME') },
  work_detail: { type: DataTypes.TEXT },
  preferred_area: { type: DataTypes.STRING },
  available_date: { type: DataTypes.DATE },
  experience: { type: DataTypes.TEXT },
  work_history: { type: DataTypes.TEXT },
  tools: { type: DataTypes.TEXT },
  resume_link: { type: DataTypes.TEXT },
  license_link: { type: DataTypes.TEXT },
}, {
  tableName: 'provider_profiles',
  timestamps: true,
});

module.exports = ProviderProfile;
