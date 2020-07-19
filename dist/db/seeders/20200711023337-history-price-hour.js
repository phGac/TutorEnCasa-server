"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('HistoryPriceHours', [
            { id: 1, id_tutor_theme: 1, price: 13500, createdAt: new Date() },
            { id: 2, id_tutor_theme: 1, price: 14300, createdAt: new Date() },
            { id: 3, id_tutor_theme: 2, price: 15000, createdAt: new Date() },
            { id: 4, id_tutor_theme: 3, price: 12900, createdAt: new Date() },
            { id: 5, id_tutor_theme: 4, price: 16500, createdAt: new Date() },
            { id: 6, id_tutor_theme: 5, price: 17000, createdAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('HistoryPriceHours', {}, {});
    }
};
