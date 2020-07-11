import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('Payments', [
			{ id: 1, token: '', value: 12300, status: 0, currency: 'CLP', subject: '', createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, token: '', value: 15800, status: 0, currency: 'CLP', subject: '', createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, token: '', value: 13400, status: 0, currency: 'CLP', subject: '', createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, token: '', value: 18600, status: 0, currency: 'CLP', subject: '', createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, token: '', value: 15000, status: 0, currency: 'CLP', subject: '', createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('Payments', {}, {});
	}
};
