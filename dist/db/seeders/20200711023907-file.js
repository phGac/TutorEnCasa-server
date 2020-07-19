"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Files', [
            { id: 1, name: 'archivo1.pdf', mime: 'application/pdf', key: '', createdAt: new Date() },
            { id: 2, name: 'archivo2.pdf', mime: 'application/pdf', key: '', createdAt: new Date() },
            { id: 3, name: 'archivo3.pdf', mime: 'application/pdf', key: '', createdAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Files', {}, {});
    }
};
