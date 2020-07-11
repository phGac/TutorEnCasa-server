import {
    QueryInterface
} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('CouponGifts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_coupon: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Coupons',
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
            message: {
                type: Sequelize.STRING,
                allowNull: true
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
        return queryInterface.dropTable('CouponGifts');
    }
};