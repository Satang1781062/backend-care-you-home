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
    type: DataTypes.ENUM("pending", "accepted", "completed", "cancelled"),
    defaultValue: "pending",
  },
});



module.exports = Booking;
