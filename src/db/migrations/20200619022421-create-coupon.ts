import { QueryInterface } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Coupons', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },

            id_user: {
                type: Sequelize.INTEGER
            },

            message: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            value: {
                type: Sequelize.INTEGER
            },

            expires: {
                type: Sequelize.DATE
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
        return queryInterface.dropTable('Coupons');
    }
};
