'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_service_1 = require("../../services/hash.service");
module.exports = {
    up: (queryInterface, sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const password = yield hash_service_1.encryptPassword('PASS@23pass');
        return queryInterface.bulkInsert('HistoryPasswords', [
            { id: 1, id_user: 1, password: password, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, id_user: 2, password: password, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, id_user: 3, password: password, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, id_user: 4, password: password, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, id_user: 5, password: password, createdAt: new Date(), updatedAt: new Date() },
        ]);
    }),
    down: (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('HistoryPasswords', {}, {});
    }
};
