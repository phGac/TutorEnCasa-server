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
const tutor_controller_1 = __importStar(require("../controllers/tutor.controller"));
const availability_time_controller_1 = require("../controllers/availability_time.controller");
const router = express_1.Router();
router.get('/times', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, availability_time_controller_1.AvailabilityTimeValidatorController.show, availability_time_controller_1.AvailabilityTimeController.show);
router.post('/times/new', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, availability_time_controller_1.AvailabilityTimeValidatorController.create, availability_time_controller_1.AvailabilityTimeController.create);
/**
 *
 * @api {post} /tutor/:id Ver Tutor
 * @apiName ShowTutor
 * @apiGroup Tutor
 * @apiVersion  0.0.1
 *
 * @apiDescription Solicita la revisión para ser tutor
 *
 * @apiParam  {int} id Id del tutor
 *
 * @apiSuccess (200) {string} status Estado de la petición
 * @apiSuccess (200) {Tutor} tutor Tutor según id
 *
 * @apiSuccess (400) {string} status Estado de la petición
 * @apiSuccess (400) {string} error Razón de error en la petición
 *
 *
 */
router.get('/:id', session_middleware_1.isLoggedIn, tutor_controller_1.TutorValidatorController.show, tutor_controller_1.default.show);
/**
 *
 * @api {post} /tutor/:id Ver Tutor
 * @apiName ShowTutor
 * @apiGroup Tutor
 * @apiVersion  0.0.1
 *
 * @apiDescription Solicita la revisión para ser tutor
 *
 * @apiParam  {int} id Id del tutor
 *
 * @apiSuccess (200) {string} status Estado de la petición
 * @apiSuccess (200) {Tutor} tutor Tutor según id
 *
 * @apiSuccess (400) {string} status Estado de la petición
 * @apiSuccess (400) {string} error Razón de error en la petición
 *
 *
 */
router.get('/request', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, tutor_controller_1.TutorValidatorController.request, tutor_controller_1.default.request);
router.get('/request/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, tutor_controller_1.TutorValidatorController.validate, tutor_controller_1.default.validate);
/**
 *
 * @api {post} /tutor/request Solicitar ser Tutor
 * @apiName RequestTutor
 * @apiGroup Tutor
 * @apiVersion  0.0.1
 *
 * @apiDescription Solicita la revisión para ser tutor
 *
 * @apiParam  {file} file Certificado de Alumno Regular
 *
 * @apiSuccess (200) {string} status Estado de la petición
 *
 * @apiSuccess (400) {string} status Estado de la petición
 * @apiSuccess (400) {string} error Razón de error en la petición
 *
 *
 */
router.post('/request', session_middleware_1.isLoggedIn, session_middleware_1.isNotTutor, tutor_controller_1.TutorValidatorController.create, tutor_controller_1.default.create);
/**
 *
 * @api {post} /tutor/theme Agregar Temas a Tutor
 * @apiName AddThemeTutor
 * @apiGroup Tutor
 * @apiVersion  0.0.1
 *
 * @apiDescription Agrega temas al tutor logeado
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {string} status Estado de la petición
 *
 *
 */
router.post('/theme', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, tutor_controller_1.default.addThemes);
exports.default = router;
