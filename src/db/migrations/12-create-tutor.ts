import {
    QueryInterface,
    DataTypes
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Tutors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },

            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            description: {
                type: Sequelize.STRING(500)
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('Tutors');
    }
};
