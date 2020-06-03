import { Router } from 'express';
import UserController from '../controllers/user_controller';

const router = Router();

router.get('/:id', UserController.show);
router.post('/new', UserController.create);

export default router;