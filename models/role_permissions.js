'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePermissions = sequelize.define('RolePermissions', {
    id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
    }
  }, {
    tableName: 'role_permissions'
  });
  RolePermissions.associate = function(models) {
    // associations can be defined here
  };
  return RolePermissions;
};