import { Router } from 'express';
import { isLoggedIn, isTutor } from '../middlewares/session.middleware';
import MeetingController, { MeetingValidatorController } from '../controllers/meeting.controller';

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
router.post('/new', isLoggedIn, isTutor, MeetingValidatorController.create, MeetingController.create);

router.post('/join', isLoggedIn, MeetingValidatorController.join, MeetingController.join);

router.delete('/:id', isLoggedIn, isTutor, MeetingValidatorController.destroy, MeetingController.destroy);

export default router;