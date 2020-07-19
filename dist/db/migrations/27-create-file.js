"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mime: {
                type: Sequelize.STRING,
                allowNull: false
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Files');
    }
};
