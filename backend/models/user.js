'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    role: DataTypes.ENUM('user', 'admin'),
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    deuterium: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  });
  return User;
};