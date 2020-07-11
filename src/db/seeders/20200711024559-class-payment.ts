import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('ClassPayments', [
			{ id: 1, id_class: 1, id_student: 2, id_payment: 1, id_coupon: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_class: 2, id_student: 1, id_payment: 2, id_coupon: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_class: 3, id_student: 1, id_payment: 3, id_coupon: null, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('ClassPayments', {}, {});
	}
};
