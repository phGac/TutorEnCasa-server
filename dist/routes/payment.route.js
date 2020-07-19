"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session.middleware");
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.Router();
router.post('/confirm', session_middleware_1.isNotLoggedIn, payment_controller_1.PaymentValidatorController.confirm, payment_controller_1.PaymentController.confirm);
exports.default = router;
