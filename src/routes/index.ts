import userRoutes from './user_routes';
import sessionRoutes from './session_routes';
import meetingRoutes from './meeting_routes';
import themeRoutes from './theme_routes';
import tutorRoutes from './tutor_routes';

export default function(app: any) {
    app.addRoutes('/api', sessionRoutes);
    app.addRoutes('/api/user', userRoutes);
    app.addRoutes('/api/meeting', meetingRoutes);
    app.addRoutes('/api/theme', themeRoutes);
    app.addRoutes('/api/tutor', tutorRoutes);
}

/**
 * @apiDefine MeetingController Reunión
 *      Permite el manejo de las reuniones
 */

/** 
 * @apiDefine SessionController Sesión
 *      Permite el manejo de sesiones
 */

/** 
 * @apiDefine UserController Usuario
 *      Permite el manejo de usuarios
 */

 /** 
 * @apiDefine ThemeController Tema
  *     Estos son los temas que enseñan los profesores, por ejemplo Matemáticas
 */
