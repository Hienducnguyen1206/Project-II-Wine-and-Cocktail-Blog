'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogpost extends Model {

    static associate(models) {
      // define association here
      Blogpost.belongsTo(models.User, { foreignKey: 'UserUid', as: 'post' } )
      Blogpost.hasMany(models.Comment,{ foreignKey: 'BlogpostPid', as: 'commentofpost' })
      Blogpost.hasMany(models.Blogpost_Image, { foreignKey: 'BlogpostPid', as: 'image' })
      
    }
  }
  Blogpost.init({
    pid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    UserUid: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    numberrating: DataTypes.INTEGER,
    status: DataTypes.STRING,
    Keyword: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Blogpost',

  });
  Blogpost.removeAttribute('id');
  return Blogpost;
};

