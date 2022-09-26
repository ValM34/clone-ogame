'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liaison_users_research extends Model {
    
  };
  Liaison_users_research.init({
    id_user: DataTypes.INTEGER,
    id_research: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Liaison_users_research',
    underscored: true
  });
  return Liaison_users_research;
};