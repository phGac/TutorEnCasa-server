"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_class: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Classes',
                    key: 'id'
                }
            },
            id_student: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: sequelize_1.DataTypes.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Schedules');
    }
};
