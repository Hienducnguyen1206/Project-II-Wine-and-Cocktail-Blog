'use strict';

const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Blogpost, { foreignKey: 'UserUid', as: 'post' })
      User.hasMany(models.Comment,{ foreignKey: 'UserUid', as: 'commentofuser' })
      
    }
  }
  User.init({
    uid:  {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.TEXT,
    gender: DataTypes.BOOLEAN,
    roleid: DataTypes.INTEGER,
  }, 
  {
    sequelize,
    modelName: 'User',
  });

  User.removeAttribute('id');
  return User;
};
