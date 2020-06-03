"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const router = express_1.Router();
router.get('/:id', user_controller_1.default.show);
router.post('/new', user_controller_1.default.create);
exports.default = router;
