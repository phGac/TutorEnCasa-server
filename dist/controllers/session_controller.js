"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../config/messages");
const auth_service_1 = require("../services/auth_service");
class SessionController {
    static create(req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.status(400)
                .json({
                status: 'failed',
                error: messages_1.requestMessage["params.missing"]
            });
            return;
        }
        const { email, password } = req.body;
        auth_service_1.auth(email, password)
            .then((user) => {
            const token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY || '', { expiresIn: 1440 });
            res
                //.cookie('auth-token', token)
                .json({ status: 'success', user, token });
        })
            .catch((e) => {
            next(e);
            res.json({ status: 'failed', error: e });
        });
    }
    static destroy(req, res) {
        if (req.cookies['auth-token'])
            res.clearCookie('auth-token');
        res.json({ status: 'success' });
    }
}
exports.default = SessionController;
