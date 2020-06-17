"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTutor = void 0;
const tutor_1 = __importDefault(require("../db/models/tutor"));
function findTutor(options) {
    return new Promise((resolve, reject) => {
        const findOptions = {
            where: options.where
        };
        if (options.include) {
            findOptions.include = [];
            if (options.include.classes)
                findOptions.include.push({ association: 'classess' });
            if (options.include.times)
                findOptions.include.push({ association: 'times' });
            if (options.include.priceses)
                findOptions.include.push({ association: 'priceses' });
            if (options.include.students)
                findOptions.include.push({ association: 'students' });
        }
        tutor_1.default.findAll(findOptions)
            .then((tutors) => {
            resolve(tutors);
        })
            .catch((e) => {
            reject(e);
        });
    });
}
exports.findTutor = findTutor;
