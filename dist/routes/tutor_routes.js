"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session_middleware");
const tutor_controller_1 = __importDefault(require("../controllers/tutor_controller"));
const router = express_1.Router();
/**
 *
 * @api {post} /tutor/request Solicitar ser Tutor
 * @apiName RequestTutor
 * @apiGroup Tutor
 * @apiVersion  0.0.1
 *
 * @apiDescription Solicita la revisión para ser tutor
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {string} status Estado de la petición
 *
 *
 */
router.post('/request', session_middleware_1.isLoggedIn, session_middleware_1.isNotTutor, tutor_controller_1.default.request);
exports.default = router;
