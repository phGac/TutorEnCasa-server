import { Router } from 'express';
import ClassController, { ClassValidatorController } from '../controllers/class_controller';
import { isLoggedIn } from '../middlewares/session.middleware';

const router = Router();

router.post('/new', isLoggedIn, ClassValidatorController.create, ClassController.create);

export default router;