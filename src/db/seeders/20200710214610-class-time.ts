import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('ClassTimes', [
			{ id: 1, id_class: 1, id_availability_time: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_class: 1, id_availability_time: 2, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_class: 2, id_availability_time: 3, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('ClassTimes', {}, {});
	}
};
