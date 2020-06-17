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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_service_1 = __importStar(require("../services/email_service"));
const logger_1 = __importDefault(require("../util/logger"));
const router = express_1.Router();
router.get('/email', (req, res) => {
    const from = process.env.AWS_WORKMAIL_EMAIL || '';
    const to = [process.env.AWS_WORKMAIL_TEST_EMAIL || ''];
    const subject = 'Email de Prueba';
    email_service_1.default.sendEmail(new email_service_1.Email('Email de Prueba', 'Este es el cuerpo del mensaje!', to, from))
        .then((emailId) => {
        logger_1.default().info(`Email enviado exitosamente! => ${emailId}`);
        res.json({ status: 'success' });
    })
        .catch((e) => {
        logger_1.default().error(e);
        res.status(400).json({ status: 'failed' });
    });
});
exports.default = router;
