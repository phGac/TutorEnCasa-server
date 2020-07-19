"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importStar(require("../controllers/user.controller"));
const session_middleware_1 = require("../middlewares/session.middleware");
const router = express_1.Router();
router.get('/:id', session_middleware_1.isLoggedIn, user_controller_1.UserValidatorController.show, user_controller_1.default.show);
router.post('/new', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, user_controller_1.UserValidatorController.create, user_controller_1.default.create);
router.put('/', session_middleware_1.isLoggedIn, user_controller_1.UserValidatorController.update, user_controller_1.default.update);
router.put('/profile', session_middleware_1.isLoggedIn, user_controller_1.UserValidatorController.profile, user_controller_1.default.profile);
router.put('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, user_controller_1.UserValidatorController.update, user_controller_1.default.update);
router.delete('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, user_controller_1.UserValidatorController.destroy, user_controller_1.default.destroy);
router.get('/:dni/validate', session_middleware_1.isNotLoggedIn, user_controller_1.UserValidatorController.validate, user_controller_1.default.validate);
exports.default = router;
