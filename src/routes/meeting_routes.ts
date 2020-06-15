import { Router, Request, Response } from 'express';
import { isLoggedIn, isTutor } from '../middlewares/session_middleware';
import MeetingController from '../controllers/meeting_controller';

const router = Router();

router.post('/new', isLoggedIn, isTutor, MeetingController.create);
router.post('/join', isLoggedIn, MeetingController.join);
router.post('/delete', isLoggedIn, isTutor, MeetingController.destroy);

export default router;