"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session_middleware");
const tutor_controller_1 = __importDefault(require("../controllers/tutor_controller"));
const router = express_1.Router();
router.post('/theme/add', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, tutor_controller_1.default.addTheme);
exports.default = router;
