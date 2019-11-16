'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define('Reports', {
    reason: {
      type: DataTypes.ENUM(['inapproperiate', 'other']),
      defaultValue: 'other'
    },
    comment: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'reports'
  });
  Reports.associate = function(models) {
    // associations can be defined here
    models.Reports.belongsTo(models.Ads, {foreignKey: 'ads_id', as: 'ads'});
    models.Reports.belongsTo(models.Users, {foreignKey: 'user_id', as: 'reporter'});
  };
  return Reports;
};