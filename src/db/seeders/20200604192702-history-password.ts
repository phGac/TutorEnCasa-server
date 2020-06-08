'use strict';

import { QueryInterface, Sequelize } from "sequelize/types";

import { encryptPassword }  from '../../services/hash';

module.exports = {
  	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		const password = await encryptPassword('PASS@23pass');
		return queryInterface.bulkInsert('HistoryPasswords', [
			{ id: 1, id_user: 1, password: password, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_user: 2, password: password, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_user: 3, password: password, createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, id_user: 4, password: password, createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, id_user: 5, password: password, createdAt: new Date(), updatedAt: new Date() },
		]);
  	},

  	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('HistoryPasswords', {}, {});
  	}
};
