"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('HistoryReports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_administrator: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Administrators',
                    key: 'id'
                }
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('HistoryReports');
    }
};
