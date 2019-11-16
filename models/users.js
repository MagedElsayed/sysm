'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'last_name'
    },
    age: {
      type: DataTypes.SMALLINT(3),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female'],
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    fbAccount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    twAccount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    snapAccount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    lastActive: {
      type: DataTypes.DATE
    },
    activatoinState: {
      type: DataTypes.ENUM,
      values: ['ACTIVATED', 'PENDING', 'CANCELED'],
      defaultValue:'PENDING',
      field: 'activatoin_state'
    },
    activationCode: {
      type: DataTypes.INTEGER(20),
      allowNull: true,
      field: 'act_code'
    },
    activationCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'registeredAt',
    tableName: 'users',
    validate: {

    },
    getterMethods: {
      accounts(){
        return {
          facebook: this.getDataValue('fbAccount') || '',
          twitter: this.getDataValue('twAccount') || '',
          snapChat: this.getDataValue('snapAccount') || ''
        };
      },
      activated(){
        return this.getDataValue('activatoinState') === 'ACTIVATED';
      }
    }
  });

  Users.associate = function(models) {
    // associations can be defined here
    models.Users.belongsTo(models.Roles, {foreignKey: 'roleId', as: 'role'});
    models.Users.hasMany(models.Ads, {foreignKey: 'advertiserId', as: 'advertiser'});
    models.Users.hasMany(models.Coupons, {foreignKey: 'ownerId', as: 'basket'});
    models.Users.hasMany(models.Likes, {foreignKey: 'userId', as: 'likes'});
    models.Users.hasMany(models.Comments, {foreignKey: 'userId', as: 'comments'});
    models.Users.hasMany(models.Reports, {foreignKey: 'userId', as: 'reports'});
    // models.Users.hasOne(models.ActivationCodes, {foreignKey: 'userId', as: 'activation_code'});
  };
  return Users;
};