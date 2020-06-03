"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TimeAvailabilities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_tutor: {
                type: Sequelize.INTEGER
            },
            start: {
                type: Sequelize.DATE
            },
            finish: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('TimeAvailabilities');
    }
};
