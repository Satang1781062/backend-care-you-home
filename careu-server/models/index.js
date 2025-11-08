const User = require("./user");
const CustomerProfile = require("./customerProfile");
const ProviderProfile = require("./providerProfile");

// ความสัมพันธ์ 1:1
User.hasOne(CustomerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(ProviderProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });

CustomerProfile.belongsTo(User, { foreignKey: 'user_id' });
ProviderProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  CustomerProfile,
  ProviderProfile,
};