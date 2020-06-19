'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('StudentTutors', [
            { id_student: 2, id_tutor: 1, status: 0, createdAt: new Date(), updatedAt: new Date() },
            { id_student: 3, id_tutor: 2, status: 0, createdAt: new Date(), updatedAt: new Date() },
            { id_student: 4, id_tutor: 1, status: 0, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('StudentTutors', {}, {});
    }
};