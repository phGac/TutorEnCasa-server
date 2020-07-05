import { Router } from 'express';
import SessionController, { SessionValidatorController } from '../controllers/session_controller';
import UserController from '../controllers/user_controller';
import { isLoggedIn, isNotLoggedIn, isTutor } from '../middlewares/session.middleware';

const router = Router();

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
router.post('/register/:step', UserController.create);

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
router.post('/login', isNotLoggedIn, SessionValidatorController.create, SessionController.create);

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
router.get('/logout', isLoggedIn, SessionValidatorController.destroy, SessionController.destroy);

export default router;