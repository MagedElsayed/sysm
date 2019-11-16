'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'comments'
  });
  Comments.associate = function(models) {
    // associations can be defined here
    models.Comments.belongsTo(models.Users, {foreignKey: 'userId', as: 'user'});
    models.Comments.belongsTo(models.Ads, {foreignKey: 'adsId', as: 'ads'});
    models.Comments.hasMany(models.Likes, {foreignKey: 'targetId', as: 'likes'});
  };
  return Comments;
};

