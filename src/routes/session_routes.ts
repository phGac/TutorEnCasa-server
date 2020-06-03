import { Router } from 'express';
import SessionController from '../controllers/session_controller';
import UserController from '../controllers/user_controller';

const router = Router();

router.post('/register/:step', UserController.create);

router.post('/login', SessionController.create);
router.get('/logout', SessionController.destroy);

export default router;