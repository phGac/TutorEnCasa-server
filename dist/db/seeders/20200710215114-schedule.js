"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Schedules', [
            { id: 1, id_class: 1, id_student: 2, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_class: 2, id_student: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_class: 3, id_student: 5, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Schedules', {}, {});
    }
};
