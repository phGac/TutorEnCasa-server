import { QueryInterface } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Coupons', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },

            id_user_from: {
                type: Sequelize.INTEGER
            },

            id_user_to: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
