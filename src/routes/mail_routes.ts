import { Router, Request, Response } from 'express';
import EmailService, { Email } from '../services/email_service';
import logger from '../util/logger';

const router = Router();

router.get('/email', (req: Request, res: Response) => {
    const from = process.env.AWS_WORKMAIL_EMAIL || '';
    const to = [ process.env.AWS_WORKMAIL_TEST_EMAIL || '' ];
    const subject = 'Email de Prueba';
    EmailService.sendEmail(new Email('Email de Prueba', 'Este es el cuerpo del mensaje!', to, from))
        .then((emailId) => {
            logger().info(`Email enviado exitosamente! => ${emailId}`);
            res.json({ status: 'success' });
        })
        .catch((e) => {
            logger().error(e);
            res.status(400).json({ status: 'failed' });
        });
});

export default router;