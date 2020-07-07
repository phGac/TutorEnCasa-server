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
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },

            id_user_to: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },

            message: {
                type: Sequelize.TEXT,
                allowNull: true
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

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('Coupons');
    }
};
