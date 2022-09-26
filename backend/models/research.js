'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Research extends Model {
  };
  Research.init({
    name: DataTypes.STRING,
    metal_price: DataTypes.INTEGER,
    crystal_price: DataTypes.INTEGER,
    deuterium_price: DataTypes.INTEGER,
    multiplier: DataTypes.INTEGER,
    price_multiplier: DataTypes.INTEGER,
    description: DataTypes.STRING,
    img_src: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Research',
    underscored: true
  });
  return Research;
};