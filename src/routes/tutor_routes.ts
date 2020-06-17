import { Router } from 'express';
import { isLoggedIn, isAdministrator, isTutor } from '../middlewares/session_middleware';
import TutorController from '../controllers/tutor_controller';

const router = Router();

router.post('/theme/add', isLoggedIn, isTutor, TutorController.addTheme);

export default router;