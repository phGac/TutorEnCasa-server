import { Router } from 'express';
import { isLoggedIn, isAdministrator } from '../middlewares/session_middleware';
import ThemeController from '../controllers/theme_controller';

const router = Router();

router.get(['/', '/:id'], isLoggedIn, ThemeController.show);
router.post('/new', isLoggedIn, isAdministrator, ThemeController.create);
router.put('/:id', isLoggedIn, isAdministrator, ThemeController.update);
router.delete('/:id', isLoggedIn, isAdministrator, ThemeController.destroy);

export default router;