'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blogpost_Image', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
      BlogpostPid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },     
      link:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      describtion: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Blogpost_Image');
  }
};