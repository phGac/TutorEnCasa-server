"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __importDefault(require("./user_entity"));
class StudentEntity extends user_entity_1.default {
    constructor(data) {
        super(data);
        this.firstname = data.firstname;
        this.lastname = data.lastname;
    }
}
exports.default = StudentEntity;
