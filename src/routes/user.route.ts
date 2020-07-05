import { Router } from 'express';
import UserController, { UserValidatorController } from '../controllers/user_controller';
import { isLoggedIn, isAdministrator, isNotLoggedIn } from '../middlewares/session.middleware';

const router = Router();

router.get('/:id', isLoggedIn, UserValidatorController.show, UserController.show);
router.post('/new', isLoggedIn, isAdministrator, UserValidatorController.create, UserController.create);
router.put('/:id', isLoggedIn, isAdministrator, UserValidatorController.update, UserController.update);
router.delete('/:id', isLoggedIn, isAdministrator, UserValidatorController.destroy, UserController.destroy);

router.get('/:dni/validate', isNotLoggedIn, UserValidatorController.validate, UserController.validate);

export default router;