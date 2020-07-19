"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session.middleware");
const coupon_controller_1 = __importStar(require("../controllers/coupon.controller"));
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
router.post('/new', session_middleware_1.isLoggedIn, coupon_controller_1.CouponValidatorController.create, coupon_controller_1.default.create);
router.get(['/', '/:id'], session_middleware_1.isLoggedIn, coupon_controller_1.CouponValidatorController.show, coupon_controller_1.default.show);
router.get('/:id/status', session_middleware_1.isLoggedIn, coupon_controller_1.CouponValidatorController.status, coupon_controller_1.default.status);
router.put('/:id/gift', session_middleware_1.isLoggedIn, coupon_controller_1.CouponValidatorController.gift, coupon_controller_1.default.gift);
router.delete('/:id', session_middleware_1.isLoggedIn, coupon_controller_1.CouponValidatorController.destroy, coupon_controller_1.default.destroy);
exports.default = router;
