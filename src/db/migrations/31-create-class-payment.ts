import {
    QueryInterface
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('ClassPayments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            id_class: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Classes',
                    key: 'id'
                }
            },

            id_student: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },

            id_payment: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Payments',
                    key: 'id'
                }
            },

            id_coupon: {
                type: Sequelize.STRING(10),
                allowNull: true,
                comment: 'Discount',
                references: {
                    model: 'Coupons',
                    key: 'id'
                }
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
        return queryInterface.dropTable('ClassPayments');
    }
};
