"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('HistoryReports', [
            { id: 1, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('HistoryReports', {}, {});
    }
};
