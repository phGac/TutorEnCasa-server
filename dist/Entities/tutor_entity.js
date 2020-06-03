"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_entity_1 = __importDefault(require("./student_entity"));
class TutorEntity extends student_entity_1.default {
    constructor(data) {
        super(data);
        this.priceHour = data.priceHour;
    }
}
exports.default = TutorEntity;
