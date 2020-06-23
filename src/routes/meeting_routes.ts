import { Router } from 'express';
import { isLoggedIn, isTutor } from '../middlewares/session_middleware';
import MeetingController from '../controllers/meeting_controller';

const router = Router();

 /**
 * @api {post} /meeting/new Crear Reunión
 * @apiVersion 0.0.1
 * @apiName CreateMeeting
 * @apiGroup Reunión
 * @apiPermission Tutor
 *
 * @apiDescription Permite crear una reunión
 *
 *
 * @apiUse MeetingController
 */
router.post('/new', isLoggedIn, isTutor, MeetingController.create);

router.post('/join', isLoggedIn, MeetingController.join);

router.post('/delete/:id', isLoggedIn, isTutor, MeetingController.destroy);

export default router;