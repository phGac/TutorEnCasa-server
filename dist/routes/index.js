"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const session_route_1 = __importDefault(require("./session.route"));
const meeting_route_1 = __importDefault(require("./meeting.route"));
const theme_route_1 = __importDefault(require("./theme.route"));
const tutor_route_1 = __importDefault(require("./tutor.route"));
const coupon_route_1 = __importDefault(require("./coupon.route"));
const class_route_1 = __importDefault(require("./class.route"));
const client_route_1 = __importDefault(require("./client.route"));
const administrator_route_1 = __importDefault(require("./administrator.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
function default_1(app) {
    app.index((req, res) => {
        res.redirect('/public/');
    });
    app.addRoutes('/public', client_route_1.default);
    app.addRoutes('/api', session_route_1.default);
    app.addRoutes('/api/user', user_route_1.default);
    app.addRoutes('/api/meeting', meeting_route_1.default);
    app.addRoutes('/api/theme', theme_route_1.default);
    app.addRoutes('/api/tutor', tutor_route_1.default);
    app.addRoutes('/api/coupon', coupon_route_1.default);
    app.addRoutes('/api/class', class_route_1.default);
    app.addRoutes('/api/admin', administrator_route_1.default);
    app.addRoutes('/api/payment', payment_route_1.default);
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
