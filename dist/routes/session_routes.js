"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = __importDefault(require("../controllers/session_controller"));
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const router = express_1.Router();
router.post('/register/:step', user_controller_1.default.create);
router.post('/login', session_controller_1.default.create);
router.get('/logout', session_controller_1.default.destroy);
exports.default = router;
