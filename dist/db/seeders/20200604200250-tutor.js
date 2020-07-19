"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Tutors', [
            { id: 1, id_user: 1, status: 1, rating: 4.352, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_user: 5, status: 1, rating: 3.740, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_user: 3, status: 0, rating: 2.976, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Tutors', {}, {});
    }
};
