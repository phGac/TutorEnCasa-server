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
const logger_1 = __importDefault(require("../util/logger"));
const user_service_1 = __importDefault(require("../services/user_service"));
const messages_1 = require("../config/messages");
const user_1 = __importStar(require("../db/models/user"));
const email_service_1 = __importStar(require("../services/email_service"));
const to_show_client_1 = require("../util/to_show_client");
class UserController {
    static show(req, res) {
        if (!req.params.id) {
            res.status(400).json({
                satus: 'failed',
                error: messages_1.requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.params;
        const options = {
            where: { id },
            include: [
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        user_1.default.findOne(options)
            .then((user) => {
            const toShow = (user) ? to_show_client_1.userToShowClient(user) : null;
            res.json({
                status: 'success',
                user: toShow
            });
        })
            .catch((err) => {
            logger_1.default().error(err);
            res.json({ status: 'failed', error: messages_1.requestMessage["error.unknow"] });
        });
    }
    static create(req, res, next) {
        switch (req.params.step) {
            case '1':
                if (!req.body.email || !req.body.password || !req.body.dni) {
                    return res.json({ status: 'failed', error: messages_1.requestMessage["params.missing"] });
                }
                const { email, password, dni } = req.body;
                user_service_1.default.create({ email, password, dni })
                    .then((user) => {
                    res.json({ status: 'success', message: messages_1.registerMessage["user.status.ok"] });
                })
                    .catch((err) => {
                    if (err.custom) {
                        res.json({ error: err.error });
                    }
                    else {
                        logger_1.default().error(err.error);
                        res.json({ status: 'failed', error: messages_1.requestMessage["error.unknow"] });
                    }
                });
                break;
            case '2':
                if (!req.body.firstname || !req.body.lastname || !req.body.birthdate || !req.body.dni) {
                    return res.json({ status: 'failed', error: messages_1.requestMessage["params.missing"] });
                }
                const data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: new Date(req.body.birthdate),
                    status: user_1.UserStatus.ACTIVE
                };
                user_service_1.default.update(data, { dni: req.body.dni })
                    .then((info) => {
                    if (info.count == 1) {
                        res.locals.user = info.users[0];
                        res.locals.auth = true;
                        res.json({ status: 'success', user: info.users[0] });
                        email_service_1.default.sendEmail(new email_service_1.Email('Valida tu cuenta!', `Dirigete al siguiente link para validar tu cuenta (${email}): http://link.com/ajjajka`));
                        next();
                    }
                    else {
                        res.json({ status: 'failed', error: messages_1.registerMessage["step.two.user.notFound"] });
                    }
                })
                    .catch((err) => {
                    logger_1.default().error(err);
                    res.json({ status: 'failed', error: messages_1.requestMessage["error.unknow"] });
                });
                break;
            default:
                res.json({ status: 'failed', error: messages_1.registerMessage["step.out"] });
        }
    }
    static update(req, res) { }
    static destroy(req, res) { }
}
exports.default = UserController;
