'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.bulkInsert('Users', [
            { id: 1, firstname: 'Philippe', lastname: 'Gac', email: 'pgac@email.com', dni: 19961684, birthdate: new Date('1998-12-24'), status: 0, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, firstname: 'Pablo', lastname: 'Aldonozo', email: 'paldonozo@email.com', dni: 21219635, birthdate: new Date('2003-05-11'), status: 2, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, firstname: 'José', lastname: 'Carcamo', email: 'jcarcamo@email.com', dni: 13177403, birthdate: new Date('1982-03-05'), status: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, firstname: 'Brayan', lastname: 'Mora', email: 'bmora@email.com', dni: 17690155, birthdate: new Date('1994-07-16'), status: 2, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, firstname: 'Gariel', lastname: 'Inoza', email: 'ginozaemail.com', dni: 11663077, birthdate: new Date('1977-03-04'), status: 0, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Users', {}, {});
    }
};
