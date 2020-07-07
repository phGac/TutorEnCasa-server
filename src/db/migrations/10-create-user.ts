import { QueryInterface } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            firstname: {
                type: Sequelize.STRING,
                allowNull: true
            },

            lastname: {
                type: Sequelize.STRING,
                allowNull: true
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false
            },

            dni: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            birthdate: {
                type: Sequelize.DATE,
                allowNull: true
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
        return queryInterface.dropTable('Users');
    }
};
