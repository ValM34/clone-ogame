'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liaison_planets_building extends Model {
    
  };
  Liaison_planets_building.init({
    id_planet: DataTypes.INTEGER,
    id_building: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Liaison_planets_building',
    underscored: true
  });
  return Liaison_planets_building;
};