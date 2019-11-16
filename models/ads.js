'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ads = sequelize.define('Ads', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        min: 10,
        max: 100
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expirey_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    visit_count: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      defaultValue: 0
    },
    orgnization: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    org_location: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    discount: {
      type: DataTypes.SMALLINT(3),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    tableName: 'ads',
    timestamps: true,
    underscored: true,
  });
  Ads.associate = function(models) {
    // associations can be defined here
    models.Ads.hasMany(models.Likes, {foreignKey: 'targetId', as: 'likes'});
    models.Ads.hasMany(models.Comments, {foreignKey: 'adsId', as: 'comments'});
    models.Ads.hasMany(models.Coupons, {foreignKey: 'adsId', as: 'coupons'});
    models.Ads.hasMany(models.Reports, {foreignKey: 'adsId', as: 'reports'});
    models.Ads.hasMany(models.AdsAttachments, {foreignKey: 'adsId', as: 'attachments'});
    models.Ads.hasMany(models.Tags, {foreignKey: 'adsId', as: 'tags'});
    models.Ads.belongsTo(models.Users, {foreignKey: 'publisherId', as: 'publisher'});
    
  };
  return Ads;
};