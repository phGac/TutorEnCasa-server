import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('TutorThemes', [
			{ id: 1, id_tutor: 1, id_theme: 1, grade: 'Media', price: 10000, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_tutor: 1, id_theme: 1, grade: 'Media', price: 10000, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_tutor: 1, id_theme: 1, grade: 'Media', price: 10000, createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, id_tutor: 2, id_theme: 1, grade: 'Media', price: 10000, createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, id_tutor: 2, id_theme: 1, grade: 'Media', price: 10000, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('TutorThemes', {}, {});
	}
};
