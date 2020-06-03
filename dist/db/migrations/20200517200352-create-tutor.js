"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tutors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_user: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: sequelize_1.DataTypes.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tutors');
    }
};
