import {
    QueryInterface
} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('ClassTimes', {
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
            id_availability_time: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'AvailabilityTimes',
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
        return queryInterface.dropTable('ClassTimes');
    }
};