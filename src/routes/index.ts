import { Request, Response } from 'express';

import userRoutes from './user.route';
import sessionRoutes from './session.route';
import meetingRoutes from './meeting.route';
import themeRoutes from './theme.route';
import tutorRoutes from './tutor.route';
import couponRoutes from './coupon.route';
import classRoutes from './class.route';
import clientRoutes from './client.route';

export default function(app: any) {
    app.index((req: Request, res: Response) => {
        res.redirect('/public/');
    });
    app.addRoutes('/public', clientRoutes);
    app.addRoutes('/api', sessionRoutes);
    app.addRoutes('/api/user', userRoutes);
    app.addRoutes('/api/meeting', meetingRoutes);
    app.addRoutes('/api/theme', themeRoutes);
    app.addRoutes('/api/tutor', tutorRoutes);
    app.addRoutes('/api/coupon', couponRoutes);
    app.addRoutes('/api/class', classRoutes);
}

/**
 * @apiDefine MeetingController Reunión
 *      Manejo las reuniones
 */

/** 
 * @apiDefine SessionController Sesión
 *      Maneja las sesiones
 */

/** 
 * @apiDefine UserController Usuario
 *      Maneja los usuarios
 */

 /** 
 * @apiDefine ThemeController Tema
  *     Estos son los temas que enseñan los profesores, por ejemplo Matemáticas
 */

 /**
  * @apiDefine CouponController Cupón
  *    Maneja los cupones
  */
