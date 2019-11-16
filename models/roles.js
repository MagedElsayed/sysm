'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true
    },
    desc: DataTypes.TEXT
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'roles'
  });
  Roles.associate = function(models) {
    // associations can be defined here
    models.Roles.belongsToMany(models.Permissions, {through: 'RolePermissions', foreigneKey: 'role_id', otherKey: 'permission_id', as: 'permissions'});
    models.Roles.hasMany(models.Users, {foreigneKey: 'role_id', as: 'users'});
  };
  return Roles;
};