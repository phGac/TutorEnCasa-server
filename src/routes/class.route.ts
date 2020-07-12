import { Router } from 'express';
import ClassController, { ClassValidatorController } from '../controllers/class.controller';
import { isLoggedIn } from '../middlewares/session.middleware';

const router = Router();

router.post('/new', isLoggedIn, ClassValidatorController.create, ClassController.create);

router.post('/join', isLoggedIn, ClassValidatorController.join, ClassController.join);

export default router;