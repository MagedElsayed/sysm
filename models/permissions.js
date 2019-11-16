'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      unique: true
    },
    desc: DataTypes.TEXT
  }, {
    underscored: true,
    tableName: 'permissions'
  });
  Permissions.associate = function(models) {
    // associations can be defined here
    models.Permissions.belongsToMany(models.Roles, {through: 'RolePermissions', foreignKey: 'permission_id', otherKey: 'role_id', as: 'roles'});
  };
  return Permissions;
};