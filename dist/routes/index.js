"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user_routes"));
const session_routes_1 = __importDefault(require("./session_routes"));
const meeting_routes_1 = __importDefault(require("./meeting_routes"));
const theme_routes_1 = __importDefault(require("./theme_routes"));
const tutor_routes_1 = __importDefault(require("./tutor_routes"));
const coupon_routes_1 = __importDefault(require("./coupon_routes"));
function default_1(app) {
    app.addRoutes('/api', session_routes_1.default);
    app.addRoutes('/api/user', user_routes_1.default);
    app.addRoutes('/api/meeting', meeting_routes_1.default);
    app.addRoutes('/api/theme', theme_routes_1.default);
    app.addRoutes('/api/tutor', tutor_routes_1.default);
    app.addRoutes('/api/coupon', coupon_routes_1.default);
}
exports.default = default_1;
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
