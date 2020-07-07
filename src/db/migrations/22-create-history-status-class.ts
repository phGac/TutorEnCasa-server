import {
    QueryInterface, DataTypes,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('HistoryStatusClasses', {
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

            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            commentary: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('HistoryStatusClasses');
    }
};
