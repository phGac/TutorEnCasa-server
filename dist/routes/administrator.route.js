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
const session_middleware_1 = require("../middlewares/session.middleware");
const administrator_controller_1 = __importStar(require("../controllers/administrator.controller"));
const router = express_1.Router();
router.get(['/request', '/request/:id'], session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, administrator_controller_1.AdministratorValidatorController.tutorUnvalidated, administrator_controller_1.default.tutorUnvalidated);
router.get('/request/:id/certificate', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, administrator_controller_1.AdministratorValidatorController.tutorCertificate, administrator_controller_1.default.tutorCertificate);
router.put('/tutor/:id/validate', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, administrator_controller_1.AdministratorValidatorController.tutorValidate, administrator_controller_1.default.tutorValidate);
router.get('/logs', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, administrator_controller_1.AdministratorValidatorController.logs, administrator_controller_1.default.logs);
router.get(['/report', '/report/:id'], session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, administrator_controller_1.AdministratorValidatorController.reports, administrator_controller_1.default.reports);
exports.default = router;
