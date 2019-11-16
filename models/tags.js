'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'tags'
  });
  Tags.associate = function(models) {
    // associations can be defined here
    models.Tags.belongsTo(models.Ads, {foreignKey: 'tagId', as: 'ads'});

  };
  return Tags;
};