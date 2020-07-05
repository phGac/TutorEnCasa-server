import { Router } from 'express';
import { isLoggedIn, isTutor } from '../middlewares/session.middleware';
import CouponController from '../controllers/coupon_controller';

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
router.post('/new', isLoggedIn, isTutor, CouponController.create);

router.get('/:id', isLoggedIn, CouponController.show);

router.put('/:id', isLoggedIn, CouponController.update);

router.delete('/:id', isLoggedIn, isTutor, CouponController.destroy);

export default router;