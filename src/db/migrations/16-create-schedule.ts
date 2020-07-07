import { QueryInterface, DataTypes } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Schedules', {
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

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('Schedules');
    }
};
