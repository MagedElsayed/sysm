'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    on: {
      type: DataTypes.ENUM('ADS', 'COMMENT'),
      allowNull: false,
      default: 'ADS',
      field: 'type'
    }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'likedAt',
    updatedAt: false,
    tableName: 'likes'
  });
  Likes.associate = function(models) {
    // associations can be defined here
    models.Likes.belongsTo(models.Users, {foreignKey: 'userId', as: 'liker'});
    models.Likes.belongsTo(models.Ads, {foreignKey: 'targetId', as: 'likedAds'});
    models.Likes.belongsTo(models.Comments, {foreignKey: 'targetId', as: 'likedComments'});
  };
  return Likes;
};