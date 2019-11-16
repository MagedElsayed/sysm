'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdsAttachments = sequelize.define('AdsAttachments', {
    attType: {
      type: DataTypes.ENUM,
      values: ['FILE', 'URL'],
      field: 'type',
      allowNull: false
    },
    path: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'ads_attachments',
    timestamps: true,
    underscored: true
  });
  AdsAttachments.associate = function(models) {
    // associations can be defined here
    models.AdsAttachments.belongsTo(models.Ads, {foreignKey: 'ads_id', as: 'ads'});
  };
  return AdsAttachments;
};