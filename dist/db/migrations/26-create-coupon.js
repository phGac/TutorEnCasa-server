"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Coupons', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(10)
            },
            id_payment: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Payments',
                    key: 'id'
                }
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            value: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            expires: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
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
        return queryInterface.dropTable('Coupons');
    }
};
