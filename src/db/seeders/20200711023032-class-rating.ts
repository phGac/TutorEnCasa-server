import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('ClassRatings', [
			{ id: 1, id_user: 1, id_class: 1, value: 4, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_user: 2, id_class: 2, value: 5, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_user: 3, id_class: 3, value: 3, createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, id_user: 4, id_class: 1, value: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, id_user: 5, id_class: 2, value: 3, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('ClassRatings', {}, {});
	}
};
