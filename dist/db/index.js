"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sql_1 = __importDefault(require("../config/sql"));
const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const db = sql_1.default[env];
const sequelize = new sequelize_1.Sequelize(db);
exports.default = sequelize;
require("./models"); // configura la asociacion los modelos
