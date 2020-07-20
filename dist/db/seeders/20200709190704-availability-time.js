"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('AvailabilityTimes', [
            { id: 1, id_tutor: 1, start: new Date('2020-07-20 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_tutor: 1, start: new Date('2020-07-20 11:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_tutor: 1, start: new Date('2020-07-20 12:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_tutor: 1, start: new Date('2020-07-21 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, id_tutor: 1, start: new Date('2020-07-22 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 6, id_tutor: 1, start: new Date('2020-07-23 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 7, id_tutor: 3, start: new Date('2020-07-24 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('AvailabilityTimes', {}, {});
    }
};
