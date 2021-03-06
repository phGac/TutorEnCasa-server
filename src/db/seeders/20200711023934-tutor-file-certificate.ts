import { QueryInterface, Sequelize } from "sequelize/types";

module.exports = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkInsert('TutorFileCertificates', [
			{ id: 1, id_tutor: 1, id_file: 1, type: 0, description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, id_tutor: 2, id_file: 2, type: 1, description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, id_tutor: 3, id_file: 3, type: 0, description: null, createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
		return queryInterface.bulkDelete('TutorFileCertificates', {}, {});
	}
};
