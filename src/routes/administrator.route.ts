import { Router } from 'express';
import { isLoggedIn, isAdministrator } from '../middlewares/session.middleware';
import AdministratorController, { AdministratorValidatorController } from '../controllers/administrator.controller';

const router = Router();

router.get(['/request', '/request/:id'], isLoggedIn, isAdministrator, AdministratorValidatorController.tutorUnvalidated, AdministratorController.tutorUnvalidated);

router.get('/request/:id/certificate', isLoggedIn, isAdministrator, AdministratorValidatorController.tutorCertificate, AdministratorController.tutorCertificate);

router.get('/tutor/:id/validate', isLoggedIn, isAdministrator, AdministratorValidatorController.tutorValidate, AdministratorController.tutorValidate);

router.get('/logs', isLoggedIn, isAdministrator, AdministratorValidatorController.logs, AdministratorController.logs);

router.get(['/report', '/report/:id'], isLoggedIn, isAdministrator, AdministratorValidatorController.reports, AdministratorController.reports);

export default router;