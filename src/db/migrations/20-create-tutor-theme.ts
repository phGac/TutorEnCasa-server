import {
    QueryInterface,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('TutorThemes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            id_tutor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tutors',
                    key: 'id'
                }
            },

            id_theme: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Themes',
                    key: 'id'
                }
            },

            grade: {
                type: Sequelize.STRING(30),
                allowNull: false
            },

            price: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('TutorThemes');
    }
};
