const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Assessment = sequelize.define("Assessment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  booking_id: { type: DataTypes.INTEGER, allowNull: false },
  provider_id: { type: DataTypes.INTEGER, allowNull: false },
  customer_id: { type: DataTypes.INTEGER, allowNull: false },

  // -----------------------------
  // ข้อมูลผู้ป่วยพื้นฐาน
  // -----------------------------
  patient_name: { type: DataTypes.STRING },
  patient_age: { type: DataTypes.INTEGER },
  patient_disease: { type: DataTypes.STRING },
  patient_dx: { type: DataTypes.STRING },

  // -----------------------------
  // Barthel ADL
  // -----------------------------
  adl_scores: { type: DataTypes.JSON },     // q1–q10
  adl_total: { type: DataTypes.INTEGER },
  adl_result_text: { type: DataTypes.STRING },

  // -----------------------------
  // Physical Assessment
  // -----------------------------
  physical_data: { type: DataTypes.JSON },
 
  // -----------------------------
  // Progress Assessment
  // -----------------------------
  progress_data: { type: DataTypes.JSON },
  
  assessed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }

}, {
  tableName: "assessments",
  timestamps: true,
});

module.exports = Assessment;
