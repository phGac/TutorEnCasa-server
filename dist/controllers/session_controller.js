"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../config/messages");
const user_1 = __importDefault(require("../db/models/user"));
const logger_1 = __importDefault(require("../util/logger"));
const to_show_client_1 = require("../util/to_show_client");
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
        const options = {
            where: { email },
            include: [
                {
                    association: 'passwords',
                    order: [['createdAt', 'DESC']],
                    limit: 1
                },
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        user_1.default.findOne(options)
            .then((user) => {
            if (!user) {
                res.status(400).json({
                    status: 'failed',
                    error: messages_1.loginMessage["user.email.wrong"]
                });
                return;
            }
            else if (user.passwords.length == 0) {
                res.status(400).json({
                    status: 'failed',
                    error: messages_1.loginMessage["user.hasNotPassword"]
                });
                return;
            }
            else {
                user.isValidPassword(password)
                    .then((valid) => {
                    if (valid) {
                        res.locals.user = user;
                        res.locals.auth = true;
                        res.json({
                            status: 'success',
                            user: to_show_client_1.userToShowClient(user)
                        });
                        next();
                    }
                    else {
                        res.status(400).json({
                            status: 'failed',
                            error: messages_1.loginMessage["user.password.wrong"]
                        });
                    }
                })
                    .catch((e) => {
                    logger_1.default().error(e);
                    res.status(400).json({
                        status: 'failed',
                        error: messages_1.requestMessage["error.unknow"]
                    });
                });
            }
        })
            .catch((e) => {
            logger_1.default().error(e);
            res.status(400).json({
                status: 'failed',
                error: messages_1.requestMessage["error.unknow"]
            });
        });
    }
    static destroy(req, res) {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(() => { });
        res.json({ status: 'success' });
    }
}
exports.default = SessionController;
