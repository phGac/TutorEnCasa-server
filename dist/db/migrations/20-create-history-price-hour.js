"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('HistoryPriceHours', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_tutor_theme: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TutorThemes',
                    key: 'id'
                }
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: sequelize_1.DataTypes.NOW
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('HistoryPriceHours');
    }
};
