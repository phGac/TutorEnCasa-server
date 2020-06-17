"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session_middleware");
const theme_controller_1 = __importDefault(require("../controllers/theme_controller"));
const router = express_1.Router();
/**
* @api {get} /theme/:id Obtener
* @apiVersion 0.0.1
* @apiName ShowTheme
* @apiGroup Tema
* @apiPermission Estudiante
*
* @apiDescription Obtener los datos un tema o todos
*
* @apiParam {integer} [id] Digito identificador del tema
*
* @apiUse ThemeController
*/
router.get(['/', '/:id'], session_middleware_1.isLoggedIn, theme_controller_1.default.show);
/**
* @api {post} /theme/new Crear
* @apiVersion 0.0.1
* @apiName CreateTheme
* @apiGroup Tema
* @apiPermission Tutor o Administrador
*
* @apiDescription Crear un tema
*
* @apiParam {string} name Nombre del tema
* @apiParam {string} [description] Descripción del tema
* @apiParam {string} [id_theme_parent] Digito identificador del tema padre. Por ej. Cálculo es hijo de Matemáticas
*
* @apiUse ThemeController
*/
router.post('/new', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, theme_controller_1.default.create);
/**
* @api {put} /theme/:id Actualizar
* @apiVersion 0.0.1
* @apiName UpdateTheme
* @apiGroup Tema
* @apiPermission Administrador
*
* @apiDescription Actualizar los datos un tema
*
* @apiParam {string} id Digito identificador del tema
* @apiParam {string} name [opcional] Nombre del tema
* @apiParam {string} description [opcional] Descripción del tema
* @apiParam {string} id_theme_parent [opcional] Digito identificador del tema padre. Por ej. Cálculo es hijo de Matemáticas
*
* @apiUse ThemeController
*/
router.put('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, theme_controller_1.default.update);
/**
* @api {delete} /theme/:id Eliminar
* @apiVersion 0.0.1
* @apiName DeleteTheme
* @apiGroup Tema
* @apiPermission Administrador
*
* @apiDescription Permite elimnar los datos un tema
*
* @apiParam {string} id Digito identificador del tema
*
* @apiUse ThemeController
*/
router.delete('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isAdministrator, theme_controller_1.default.destroy);
exports.default = router;
