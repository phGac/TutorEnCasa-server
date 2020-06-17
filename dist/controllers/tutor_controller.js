"use strict";
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
const find_1 = require("../util/find");
const messages_1 = require("../config/messages");
const theme_1 = __importDefault(require("../db/models/theme"));
const logger_1 = __importDefault(require("../util/logger"));
const tutortheme_1 = __importDefault(require("../db/models/tutortheme"));
class TutorController {
    static find(req, res) {
        find_1.findTutor({
            where: {
            //
            },
            include: {
                priceses: true
            }
        });
    }
    static addTheme(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.id_theme && (!req.body.name)) {
                res.status(400).json({
                    status: 'failed',
                    error: messages_1.requestMessage["params.missing"]
                });
                return;
            }
            const id_tutor = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user.id_tutor;
            const name = req.body.name ? req.body.name : undefined;
            const description = req.body.description ? req.body.description : undefined;
            let id_theme = null;
            yield theme_1.default.findOrCreate({
                where: { name },
                defaults: {
                    name,
                    description
                }
            }).then((info) => {
                id_theme = info[0].id;
            })
                .catch((e) => {
                logger_1.default().error(e);
            });
            tutortheme_1.default.findOrCreate({
                defaults: {
                    id_tutor,
                    id_theme
                },
                where: { id_tutor, id_theme }
            }).then(() => {
                res.json({ status: 'success' });
            })
                .catch((e) => {
                logger_1.default().error(e);
                res.status(400).json({
                    status: 'failed',
                    error: messages_1.requestMessage["error.unknow"]
                });
            });
        });
    }
}
exports.default = TutorController;
