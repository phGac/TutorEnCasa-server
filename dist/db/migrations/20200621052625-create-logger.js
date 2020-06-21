"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Loggers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING(25),
                allowNull: true
            },
            level: {
                type: Sequelize.STRING(20)
            },
            message: {
                type: Sequelize.STRING(255)
            },
            ip: {
                type: Sequelize.STRING(40)
            },
            path: {
                type: Sequelize.STRING(300)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Loggers');
    }
};
