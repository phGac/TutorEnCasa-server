import userRoutes from './user_routes';
import sessionRoutes from './session_routes';
import meetingRoutes from './meeting_routes';
import themeRoutes from './theme_routes';
import tutorRoutes from './tutor_routes';
import couponRoutes from './coupon_routes';
import classRoutes from './class_routes';
import clientRoutes from './client_routes';
import { Request, Response } from 'express';

export default function(app: any) {
    app.index((req: Request, res: Response) => {
        res.redirect('/public');
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
