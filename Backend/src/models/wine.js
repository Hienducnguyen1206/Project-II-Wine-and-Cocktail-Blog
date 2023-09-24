'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate(models) {
    }
  }
  Wine.init({
    wid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    describtion:DataTypes.TEXT, 
    image:DataTypes.TEXT,
      
  }, {
    sequelize,
    modelName: 'Wine',
    
  });
  Wine.removeAttribute('id');
  return Wine;
};