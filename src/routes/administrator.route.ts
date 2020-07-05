import { Router } from 'express';
import { isLoggedIn, isAdministrator } from '../middlewares/session.middleware';
import AdministratorController, { AdministratorValidatorController } from '../controllers/administrator_controller';

const router = Router();

router.get('/tutor/unvalidate', isLoggedIn, isAdministrator, AdministratorValidatorController.tutorUnvalidated, AdministratorController.tutorUnvalidated);

export default router;