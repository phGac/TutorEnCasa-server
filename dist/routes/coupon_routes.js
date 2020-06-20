"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session_middleware");
const coupon_controller_1 = __importDefault(require("../controllers/coupon_controller"));
const router = express_1.Router();
/**
 *
 * @api {post} /coupon/new Crear Cupón
 * @apiName CreateCoupon
 * @apiGroup Coupon
 * @apiVersion  0.0.1
 *
 *
 * @apiParam  {integer} value Valor del cupón
 * @apiParam  {string} message Mensaje del cupón generado
 *
 * @apiSuccess (200) {string} status Estado de la petición
 * @apiSuccess (200) {string} [code] Código del cupón
 *
 * @apiSuccess (400) {string} status Estado de la petición
 *
 * @apiUse CouponController
 */
router.post('/new', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, coupon_controller_1.default.create);
router.get('/:id', session_middleware_1.isLoggedIn, coupon_controller_1.default.show);
router.put('/:id', session_middleware_1.isLoggedIn, coupon_controller_1.default.update);
router.delete('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, coupon_controller_1.default.destroy);
exports.default = router;
