import { Router } from 'express';
import SessionController from '../controllers/session_controller';
import UserController from '../controllers/user_controller';
import { isLoggedIn, setSession } from '../middlewares/session_middleware';

const router = Router();

router.post('/register/:step', UserController.create, setSession);

router.post('/login', isLoggedIn, SessionController.create, setSession);
router.get('/logout', isLoggedIn, SessionController.destroy);

export default router;