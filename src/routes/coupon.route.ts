import { Router } from 'express';
import { isLoggedIn, isTutor } from '../middlewares/session.middleware';
import CouponController, { CouponValidatorController } from '../controllers/coupon.controller';

const router = Router();

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
router.post('/new', isLoggedIn, CouponValidatorController.create, CouponController.create);

router.get(['/', '/:id'], isLoggedIn, CouponValidatorController.show, CouponController.show);

router.get('/:id/status', isLoggedIn, CouponValidatorController.status, CouponController.status);

router.put('/:id/gift', isLoggedIn, CouponValidatorController.gift, CouponController.gift);

router.delete('/:id', isLoggedIn, CouponValidatorController.destroy, CouponController.destroy);

export default router;