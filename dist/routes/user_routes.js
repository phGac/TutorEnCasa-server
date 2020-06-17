"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const session_middleware_1 = require("../middlewares/session_middleware");
const router = express_1.Router();
router.get('/:id', session_middleware_1.isLoggedIn, user_controller_1.default.show);
router.post('/new', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, user_controller_1.default.create);
router.put('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, user_controller_1.default.update);
router.delete('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, user_controller_1.default.destroy);
exports.default = router;
