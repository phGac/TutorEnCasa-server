"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TutorFileCertificates', {
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
            id_file: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Files',
                    key: 'id'
                }
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(300),
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TutorFileCertificates');
    }
};
