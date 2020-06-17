"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const dot = dotenv_1.config({ path: path_1.default.resolve(__dirname, '..', '..', '.env') });
switch ((_a = dot.parsed) === null || _a === void 0 ? void 0 : _a.NODE_ENV) {
    case 'dev':
    case 'development':
        break;
    case 'test':
        break;
    case 'prod':
    case 'production':
        break;
}
const variables = Object.assign({ PORT: '80' }, dot.parsed);
exports.default = variables;
