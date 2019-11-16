'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivationCodes = sequelize.define('ActivationCodes', {
    activationCode: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    }

  }, {
    underscored: true,
    timestamps: true,
    updatedAt: false,
    tableName: 'activation_codes',

  });
  ActivationCodes.associate = function(models) {
    // associations can be defined here
    models.ActivationCodes.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'});
  };
  return ActivationCodes;
};