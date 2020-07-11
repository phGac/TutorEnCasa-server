import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('Themes', [
			{ id: 1, name: 'Matemáticas', description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, name: 'Inglés', description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, name: 'Cálculo', description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, name: 'Física', description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, name: 'Música', description: null, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('Themes', {}, {});
	}
};
