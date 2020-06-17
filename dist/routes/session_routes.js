"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = __importDefault(require("../controllers/session_controller"));
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const session_middleware_1 = require("../middlewares/session_middleware");
const router = express_1.Router();
/**
* @api {post} /register/:step Registrar
* @apiVersion 0.0.1
* @apiName RegisterSession
* @apiGroup Sesión
* @apiPermission ninguno
*
* @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiUse"
*
* @apiParam {integer} step Número del paso del registro
*
* @apiParam (Paso 1) {String} email Correo electrónico del usuario
* @apiParam (Paso 1) {String} password Contraseña del usuario
* @apiParam (Paso 1) {integer} dni R.U.N. del usuario. Sin punto ni digito verificador
*
* @apiParam (Paso 2) {String} firstname Primer nombre del usuario
* @apiParam (Paso 2) {String} lastname Apellido paterno del usuario
* @apiParam (Paso 2) {String} birthdate Fecha de nacimiento del usuario (YYYY-MM-DD)
* @apiParam (Paso 2) {integer} dni R.U.N. del usuario. Sin punto ni digito verificador
*
* @apiSuccess (200) {string} status Estado de la petición
* @apiSuccess (200) {string} message [paso 1] Mensaje del primer paso
* @apiSuccess (200) {json} user [paso 2] Datos del usuario generado
*
* @apiError (400) {string} status Estado de la petición
* @apiError (400) {string} error Razón del error en la petición
*
* @apiUse UserController
*/
router.post('/register/:step', user_controller_1.default.create, session_middleware_1.setSession);
/**
* @api {post} /login Iniciar Sesión
* @apiVersion 0.0.1
* @apiName LoginSession
* @apiGroup Sesión
* @apiPermission ninguno
*
* @apiDescription Permite a un usuario registrado entrar a la plataforma
*
* @apiParam {String} email Correo electrónico del usuario
* @apiParam {String} password Contraseña del usuario
*
* @apiSuccess (200) {string} status Estado de la petición
* @apiSuccess (200) {json} user Datos del usuario logeado
*
* @apiError (400) {string} status Estado de la petición
* @apiError (400) {string} error Razón del error en la petición
*
* @apiUse SessionController
*/
router.post('/login', session_middleware_1.isNotLoggedIn, session_controller_1.default.create, session_middleware_1.setSession);
/**
* @api {get} /logout Cerrar Sesión
* @apiVersion 0.0.1
* @apiName LogoutSession
* @apiGroup Sesión
* @apiPermission logeado
*
* @apiDescription Permite a un usuario registrado y logeado salir de la plataforma
*
*
* @apiUse SessionController
*/
router.get('/logout', session_middleware_1.isLoggedIn, session_controller_1.default.destroy);
exports.default = router;
