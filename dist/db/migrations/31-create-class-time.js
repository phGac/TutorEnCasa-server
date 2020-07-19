"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ClassTimes', {
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
            id_availability_time: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'AvailabilityTimes',
                    key: 'id'
                }
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ClassTimes');
    }
};
