import { Router } from 'express';
import { isNotLoggedIn } from '../middlewares/session.middleware';

const router = Router();

router.get('/confirm', isNotLoggedIn, );

export default router;