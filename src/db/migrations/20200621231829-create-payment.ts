import {
    QueryInterface,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Payments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(36)
            },

            currency: {
                type: Sequelize.STRIGN(3)
            },

            token: {
                type: Sequelize.STRING(12),
                comment: 'Id external service',
                allowNull: true
            },

            value: {
                type: Sequelize.INTEGER
            },

            status: {
                type: Sequelize.INTEGER
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
