"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_1 = __importDefault(require("../config/env"));
const sequelize = new sequelize_1.Sequelize(env_1.default.DB);
exports.default = sequelize;
require("./models"); // configura la asociacion los modelos
