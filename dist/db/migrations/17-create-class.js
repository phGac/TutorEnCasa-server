"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Classes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_tutor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tutors',
                    key: 'id'
                }
            },
            id_tutor_theme: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TutorThemes',
                    key: 'id'
                }
            },
            room: {
                type: Sequelize.STRING,
                allowNull: true
            },
            price_hour: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        return queryInterface.dropTable('Classes');
    }
};
