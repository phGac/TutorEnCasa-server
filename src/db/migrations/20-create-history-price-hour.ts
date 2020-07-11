import {
    QueryInterface, DataTypes,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('HistoryPriceHours', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            id_tutor_theme: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TutorThemes',
                    key: 'id'
                }
            },

            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW
            }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('HistoryPriceHours');
    }
};
