const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CustomerProfile = sequelize.define('CustomerProfile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  full_name: { type: DataTypes.STRING },
  nickname: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
  gender: { type: DataTypes.ENUM('ชาย', 'หญิง', 'อื่นๆ') },
  occupation: { type: DataTypes.STRING },
  id_card: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  line_id: { type: DataTypes.STRING },
  marital_status: {
    type: DataTypes.ENUM('โสด', 'สมรส', 'หย่าร้าง', 'แยกกันอยู่', 'หม้าย'),
  },
  has_children: { type: DataTypes.BOOLEAN },
  num_children: { type: DataTypes.INTEGER },
  underlying_disease: { type: DataTypes.TEXT },
  past_illness: { type: DataTypes.TEXT },
  past_treatment: { type: DataTypes.TEXT },
  cancer_history: { type: DataTypes.TEXT },
  lab_result: { type: DataTypes.TEXT },
  imaging_result: { type: DataTypes.TEXT },
  supplement: { type: DataTypes.TEXT },
  brain_surgery: { type: DataTypes.ENUM('เคย', 'ไม่เคย') },
  in_hospital: { type: DataTypes.ENUM('ใช่', 'ไม่ใช่') },
  need_service: { type: DataTypes.ENUM('นักกายภาพ', 'ผู้ดูแลผู้ป่วย') },
  location: { type: DataTypes.TEXT },
}, {
  tableName: 'customer_profiles',
  timestamps: true,
});

module.exports = CustomerProfile;
