const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  provider_id: { type: DataTypes.INTEGER, allowNull: true },

  service_id: {
  type: DataTypes.INTEGER,
  allowNull: false,  
},


  description: { type: DataTypes.TEXT },

  extra_detail: { type: DataTypes.STRING }, 

  location: { type: DataTypes.STRING },
   province_name: { type: DataTypes.STRING },   
  district_name: { type: DataTypes.STRING },   
  subdistrict_name: { type: DataTypes.STRING }, 
 
  latitude: { type: DataTypes.FLOAT },
  longitude: { type: DataTypes.FLOAT },

  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },

  status: {
    type: DataTypes.ENUM("pending", "accepted", "in_progress", "completed", "cancelled"),
    defaultValue: "pending",
  },

  session_used: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  session_remaining: {
    type: DataTypes.INTEGER,
    allowNull: true, // null = ไม่ใช่คอร์ส
  },

  started_at: { type: DataTypes.DATE, allowNull: true },
  completed_at: { type: DataTypes.DATE, allowNull: true },
});



module.exports = Booking;
