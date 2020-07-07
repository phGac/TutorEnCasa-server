import {
    QueryInterface
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            mime: {
                type: Sequelize.STRING,
                allowNull: false
            },

            key: {
                type: Sequelize.STRING,
                allowNull: false
            },

            url: {
                type: Sequelize.STRING
            },

            createdAt: {
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('Files');
    }
};
