import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('HistoryReports', [
            { id: 1, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, id_administrator: 1, type: 0, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('HistoryReports', {}, {});
	}
};
