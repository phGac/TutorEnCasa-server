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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("../db/models/user"));
const messages_1 = require("../config/messages");
const logger_1 = __importDefault(require("../util/logger"));
const UserFactory_1 = __importDefault(require("../services/UserFactory"));
class UserController {
    static show(req, res) {
        res.send('User');
    }
    static create(req, res) {
        if (!req.body.email || !req.body.password || !req.body.dni) {
            return res.json({ error: 'Faltan parametros' });
        }
        const { email, password, dni } = req.body;
        user_1.default.findOne({ where: { dni } })
            .then((userbyDni) => __awaiter(this, void 0, void 0, function* () {
            if (userbyDni)
                return res.status(400).json({ error: { error: messages_1.registerMessage["user.exists"], custom: true } });
            const userByEmail = yield user_1.default.findOne({ where: { email } });
            if (userByEmail)
                return res.status(400).json({ error: { error: messages_1.registerMessage["user.exists"], custom: true } });
            const config = {
                type: 'create',
                data: {
                    email,
                    password,
                    dni,
                    status: user_1.UserStatus.UNVALIDATED
                }
            };
            const user = UserFactory_1.default.student(config);
            if (user) {
                if (req.session) {
                    req.session.user = {
                        email,
                        dni
                    };
                    req.session.save(() => { });
                }
                res.json({ status: 'ok', message: messages_1.registerMessage["user.status.ok"] });
            }
            else {
                /**
                 if(err.custom) {
                    res.json({ error: err.error });
                }
                else {
                    logger().error(err);
                    res.json({ error: true });
                }
                 */
            }
        }))
            .catch((err) => {
            if (err.custom) {
                res.json({ error: err.error });
            }
            else {
                logger_1.default().error(err);
                res.json({ error: true });
            }
        });
    }
}
exports.default = UserController;
