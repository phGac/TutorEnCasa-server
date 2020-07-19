"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('HistoryStatusClasses', {
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
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            commentary: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('HistoryStatusClasses');
    }
};
