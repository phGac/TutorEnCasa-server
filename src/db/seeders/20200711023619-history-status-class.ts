import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('HistoryStatusClasses', [
			{ id: 1, id_class: 1, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_class: 1, status: 1, commentary: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_class: 2, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, id_class: 2, status: 1, commentary: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, id_class: 3, status: 0, commentary: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 6, id_class: 3, status: 1, commentary: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 7, id_class: 3, status: 3, commentary: null, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('HistoryStatusClasses', {}, {});
	}
};
