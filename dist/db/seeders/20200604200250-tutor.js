'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Tutors', [
            { id: 1, id_user: 1, status: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_user: 5, status: 0, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Tutors', {}, {});
    }
};
