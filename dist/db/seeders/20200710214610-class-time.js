"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('ClassTimes', [
            { id: 1, id_class: 1, id_availability_time: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_class: 1, id_availability_time: 2, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_class: 2, id_availability_time: 3, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_class: 3, id_availability_time: 7, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('ClassTimes', {}, {});
    }
};
