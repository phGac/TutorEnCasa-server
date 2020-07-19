"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('ClassPayments', [
            { id: 1, id_class: 1, id_student: 2, id_payment: 1, id_coupon: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_class: 2, id_student: 1, id_payment: 2, id_coupon: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_class: 3, id_student: 1, id_payment: 3, id_coupon: null, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('ClassPayments', {}, {});
    }
};
