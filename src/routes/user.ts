import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

router.get('/', UserController.index);
router.post('/new', UserController.create);

export default router;