'use strict';

import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('Classes', [
			{ id: 1, id_tutor: 1, price_hour: 13200, start: new Date('2020-07-10 15:30:00'), finish: new Date('2020-07-10 17:30:00'), createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_tutor: 1, price_hour: 14200, start: new Date('2020-07-11 18:00:00'), finish: new Date('2020-07-11 19:30:00'), createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_tutor: 2, price_hour: 15500, start: new Date('2020-07-11 18:00:00'), finish: new Date('2020-07-11 19:30:00'), createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('Classes', {}, {});
	}
};
