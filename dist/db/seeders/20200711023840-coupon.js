"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Coupons', [
            { id: 'ERnxokq', id_payment: 1, id_user: 2, value: 5000, expires: new Date(), status: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 'SDo2sxl', id_payment: 2, id_user: 2, value: 8300, expires: new Date(), status: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: '76owdcW', id_payment: 3, id_user: 3, value: 12500, expires: new Date(), status: 0, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Coupons', {}, {});
    }
};
