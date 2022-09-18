'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    
  };
  Planet.init({
    id_user: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    localisation: DataTypes.INTEGER,
    selected: DataTypes.INTEGER,
    last_call: DataTypes.DATE,
    metal: DataTypes.INTEGER,
    crystal: DataTypes.INTEGER,
    deuterium: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Planet',
    underscored: true
  });
  return Planet;
};