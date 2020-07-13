import { Router } from 'express';
import ClassController, { ClassValidatorController } from '../controllers/class.controller';
import { isLoggedIn } from '../middlewares/session.middleware';

const router = Router();

router.get('/', isLoggedIn, ClassValidatorController.show, ClassController.show);

router.post('/new', isLoggedIn, ClassValidatorController.create, ClassController.create);

router.post('/join', isLoggedIn, ClassValidatorController.join, ClassController.join);

router.put('/:id/end', isLoggedIn, ClassValidatorController.end, ClassController.end);

router.post('/:id/rating', isLoggedIn, ClassValidatorController.rating, ClassController.rating);

export default router;