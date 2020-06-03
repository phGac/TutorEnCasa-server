"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const dot = dotenv_1.config({ path: path_1.default.resolve(__dirname, '..', '..', '.env') });
let DB = { username: '', password: '', host: '', database: '', dialect: 'mysql' };
switch ((_a = dot.parsed) === null || _a === void 0 ? void 0 : _a.NODE_ENV) {
    case 'dev':
    case 'development':
        DB = {
            username: dot.parsed.DB_USER_DEV,
            password: dot.parsed.DB_PASS_DEV,
            database: dot.parsed.DB_NAME_DEV,
            host: dot.parsed.DB_HOST_DEV,
            // @ts-ignore
            dialect: dot.parsed.DB_TYPE_DEV
        };
        break;
    case 'test':
        DB = {
            username: dot.parsed.DB_USER_TEST,
            password: dot.parsed.DB_PASS_TEST,
            database: dot.parsed.DB_NAME_TEST,
            host: dot.parsed.DB_HOST_TEST,
            // @ts-ignore
            dialect: dot.parsed.DB_TYPE_TEST
        };
        break;
    case 'prod':
    case 'production':
        DB = {
            username: dot.parsed.DB_USER_PROD,
            password: dot.parsed.DB_PASS_PROD,
            database: dot.parsed.DB_NAME_PROD,
            host: dot.parsed.DB_HOST_PROD,
            // @ts-ignore
            dialect: dot.parsed.DB_TYPE_PROD
        };
        break;
}
const variables = Object.assign(Object.assign({ PORT: '80' }, dot.parsed), { DB });
exports.default = variables;
