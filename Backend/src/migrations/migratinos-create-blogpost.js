'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Blogpost', {
            pid: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            content: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            UserUid: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            rating: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            numberrating: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            status: {
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
            },
            Keyword: {
                allowNull: false,
                type: Sequelize.TEXT,
            }
        });
    },



    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Blogpost');
    }
};