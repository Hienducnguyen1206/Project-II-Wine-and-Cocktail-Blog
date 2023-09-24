'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogpost_Image extends Model {
    
    static associate(models) {
      // define association here
      Blogpost_Image.belongsTo(models.Blogpost, { foreignKey: 'BlogpostPid', as: 'image' })
    }
  }
  Blogpost_Image.init({
    BlogpostPid: DataTypes.INTEGER,
    link: DataTypes.STRING,
    describtion: DataTypes.TEXT,
    position: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Blogpost_Image',

  });
  return Blogpost_Image;
};