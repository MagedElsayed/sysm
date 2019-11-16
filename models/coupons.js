'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupons = sequelize.define('Coupons', {
    token: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    spent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'coupons',
    underscored: true,
    timestamps: true,
    updatedAt: 'spentAt',
    createdAt: 'generatedAt'
  });
  Coupons.associate = function(models) {
    // associations can be defined here
    models.Coupons.belongsTo(models.Users, {foreignKey: 'ownerId', as: 'owner'});
    models.Coupons.belongsTo(models.Ads, {foreignKey: 'adsId', as: 'ads'});
  };
  return Coupons;
};