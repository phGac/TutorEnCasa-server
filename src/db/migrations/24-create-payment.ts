import {
    QueryInterface,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Payments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },

            currency: {
                type: Sequelize.STRING(3),
                allowNull: false
            },

            token: {
                type: Sequelize.STRING(12),
                comment: 'Id external service',
                allowNull: true
            },

            value: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            subject: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            status: {
                type: Sequelize.INTEGER,
                allowNull: false
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

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('Payments');
    }
};
