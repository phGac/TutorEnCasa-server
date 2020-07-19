"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('HistoryAccesses', [
            { id: 1, id_user: 1, ip: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_user: 1, ip: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_user: 2, ip: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_user: 2, ip: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, id_user: 3, ip: null, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('HistoryAccesses', {}, {});
    }
};
