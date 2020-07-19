"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AvailabilityTimes', {
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
            start: {
                type: Sequelize.DATE,
                allowNull: false
            },
            minutes: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('AvailabilityTimes');
    }
};
