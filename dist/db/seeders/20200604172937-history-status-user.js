'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('HistoryStatusUsers', [
            { id: 1, id_user: 1, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_user: 2, status: 2, commentary: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_user: 3, status: 1, commentary: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_user: 3, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, id_user: 4, status: 2, commentary: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 6, id_user: 5, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 7, id_user: 5, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('HistoryStatusUsers', {}, {});
    }
};
