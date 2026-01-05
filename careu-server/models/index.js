const User = require("./user");
const CustomerProfile = require("./customerProfile");
const ProviderProfile = require("./providerProfile");
const Booking = require("./booking");
const Service = require("./service");
const Assessment = require("./Assessment");


//User-profile
User.hasOne(CustomerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CustomerProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(ProviderProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ProviderProfile.belongsTo(User, { foreignKey: 'user_id' });

//Booking
User.hasMany(Booking, { foreignKey: "customer_id", as: "customerBookings" });
User.hasMany(Booking, { foreignKey: "provider_id", as: "providerBookings" });

Booking.belongsTo(User, { as: "customer", foreignKey: "customer_id" });
Booking.belongsTo(User, { as: "provider", foreignKey: "provider_id" });

// --- Booking ↔ Service ---
Service.hasMany(Booking, { foreignKey: "service_id", as: "bookings" });
Booking.belongsTo(Service, { foreignKey: "service_id", as: "service" });

// ----------------- Booking ↔ Assessment -----------------
Booking.hasOne(Assessment, { foreignKey: "booking_id", as: "assessment" });
Assessment.belongsTo(Booking, { foreignKey: "booking_id" });

// ----------------- User ↔ Assessment -----------------
User.hasMany(Assessment, { foreignKey: "customer_id", as: "customerAssessments" });
Assessment.belongsTo(User, { foreignKey: "customer_id", as: "customer" });

User.hasMany(Assessment, { foreignKey: "provider_id", as: "providerAssessments" });
Assessment.belongsTo(User, { foreignKey: "provider_id", as: "provider" });


module.exports = {
  User,
  CustomerProfile,
  ProviderProfile,
  Booking,
  Service,
  Assessment,
};