'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MetalMine extends Model {
    
  };
  MetalMine.init({
    metal_price: DataTypes.INTEGER,
    crystal_price: DataTypes.INTEGER,
    deuterium_price: DataTypes.INTEGER,
    base_production: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MetalMine',
    underscored: true
  });
  return MetalMine;
};