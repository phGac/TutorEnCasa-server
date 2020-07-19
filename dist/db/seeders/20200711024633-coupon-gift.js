"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('CouponGifts', [
            { id: 1, id_coupon: 'ERnxokq', id_user: 4, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_coupon: '76owdcW', id_user: 4, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('CouponGifts', {}, {});
    }
};
