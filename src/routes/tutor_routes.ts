import { Router } from 'express';
import { isLoggedIn, isNotTutor, isTutor, isNotLoggedIn } from '../middlewares/session_middleware';
import TutorController, { TutorValidatorController } from '../controllers/tutor_controller';

const router = Router();

router.get('/request/validate/:id', isNotLoggedIn, TutorValidatorController.validate, TutorController.validate);

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
router.post('/request', isLoggedIn, isNotTutor, TutorValidatorController.request, TutorController.request);

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
router.post('/theme', isLoggedIn, isTutor, TutorController.addThemes);

export default router;