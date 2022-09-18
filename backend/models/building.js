'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
  };
  Building.init({
    name: DataTypes.STRING,
    metal_price: DataTypes.INTEGER,
    crystal_price: DataTypes.INTEGER,
    deuterium_price: DataTypes.INTEGER,
    multiplier: DataTypes.INTEGER,
    price_multiplier: DataTypes.INTEGER,
    description: DataTypes.STRING,
    img_src: DataTypes.STRING,
    role: DataTypes.ENUM('production','reduce_construction_time','other','energy','research'),
    page: DataTypes.ENUM('ressources','installations')
  }, {
    sequelize,
    modelName: 'Building',
    underscored: true
  });
  return Building;
};