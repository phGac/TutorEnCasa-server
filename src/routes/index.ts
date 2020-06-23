import userRoutes from './user_routes';
import sessionRoutes from './session_routes';
import meetingRoutes from './meeting_routes';
import themeRoutes from './theme_routes';
import tutorRoutes from './tutor_routes';
import couponRoutes from './coupon_routes';
import classRoutes from './class_routes';

export default function(app: any) {
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
