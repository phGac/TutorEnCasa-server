import {
    QueryInterface, DataTypes,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('StudentTutors', {

            id_student: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },

            id_tutor: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Tutors',
                    key: 'id'
                }
            },

            status: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        return queryInterface.dropTable('StudentTutors');
    }
};
