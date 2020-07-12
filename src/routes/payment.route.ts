import { Router } from 'express';
import { isNotLoggedIn } from '../middlewares/session.middleware';
import { PaymentValidatorController, PaymentController } from '../controllers/payment.controller';

const router = Router();

router.post('/confirm', isNotLoggedIn, PaymentValidatorController.confirm, PaymentController.confirm);

export default router;