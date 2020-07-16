import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('AvailabilityTimes', [
			{ id: 1, id_tutor: 1, start: new Date('2020-07-12 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_tutor: 1, start: new Date('2020-07-12 11:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_tutor: 1, start: new Date('2020-07-12 12:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, id_tutor: 1, start: new Date('2020-07-13 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, id_tutor: 1, start: new Date('2020-07-14 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 6, id_tutor: 1, start: new Date('2020-07-15 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 7, id_tutor: 3, start: new Date('2020-07-15 10:00:00'), minutes: 60, status: 1, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('AvailabilityTimes', {}, {});
	}
};
