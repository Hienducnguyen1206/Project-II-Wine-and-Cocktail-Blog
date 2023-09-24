'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   
    }
  }
  Cocktail.init({
    cid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    describtion:DataTypes.TEXT,
    prepare:DataTypes.TEXT,
    image:DataTypes.TEXT,  
  }, {
    sequelize,
    modelName: 'Cocktail',
    
  });
  Cocktail.removeAttribute('id');
  return Cocktail;
};