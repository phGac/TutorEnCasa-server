import { Router } from 'express';
import { isLoggedIn, isNotTutor } from '../middlewares/session_middleware';
import TutorController from '../controllers/tutor_controller';

const router = Router();

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
router.post('/request', isLoggedIn, isNotTutor, TutorController.request);

export default router;