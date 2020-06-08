import { Router } from 'express';
import UserController from '../controllers/user_controller';
import { isLoggedIn, isAdministrator } from '../middlewares/session_middleware';

const router = Router();

router.get('/:id', isLoggedIn, UserController.show);
router.post('/new', isLoggedIn, isAdministrator, UserController.create);
router.put('/:id', isLoggedIn, isAdministrator, UserController.update);
router.delete('/:id', isLoggedIn, isAdministrator, UserController.destroy);

export default router;