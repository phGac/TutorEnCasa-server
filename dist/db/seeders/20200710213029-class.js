'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Classes', [
            { id: 1, id_tutor: 1, id_tutor_theme: 1, price_hour: 13200, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_tutor: 1, id_tutor_theme: 2, price_hour: 14200, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_tutor: 2, id_tutor_theme: 3, price_hour: 15500, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Classes', {}, {});
    }
};
