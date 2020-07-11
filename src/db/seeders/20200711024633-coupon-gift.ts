import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('CouponGifts', [
			{ id: 1, id_coupon: 'ERnxokq', id_user: 4, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_coupon: '76owdcW', id_user: 4, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('CouponGifts', {}, {});
	}
};
