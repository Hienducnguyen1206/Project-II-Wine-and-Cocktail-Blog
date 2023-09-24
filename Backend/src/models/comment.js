'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {  
      Comment.belongsTo(models.Blogpost,{ foreignKey: 'BlogpostPid', as: 'commentofpost' })

      Comment.belongsTo(models.User,{ foreignKey: 'UserUid', as: 'commentofuser' })
      }
  }
  Comment.init({
    BlogpostPid:DataTypes.INTEGER,
    UserUid:DataTypes.INTEGER,
    content:DataTypes.TEXT,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
    
  });
  Comment.removeAttribute('id');
  return Comment;
};

