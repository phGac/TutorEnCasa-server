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
const path_1 = __importDefault(require("path"));
const find_1 = require("../util/find");
const messages_1 = require("../config/messages");
const theme_1 = __importDefault(require("../db/models/theme"));
const tutortheme_1 = __importDefault(require("../db/models/tutortheme"));
const tutor_1 = __importStar(require("../db/models/tutor"));
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
    static request(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.themes || !req.files || !req.files.file) {
                next({ error: messages_1.requestMessage["params.missing"], custom: true });
                return;
            }
            // @ts-ignore
            const { id } = req.user;
            const { themes } = req.body;
            const file = req.files.file;
            tutor_1.default.create({
                id_user: id,
                status: tutor_1.TutorStatus.UNVALIDATED
            }).then((tutor) => {
                themes.forEach((name) => {
                    theme_1.default.findOrCreate({
                        where: { name },
                        defaults: { name }
                    }).then((info) => {
                        if (info[0]) {
                            tutortheme_1.default.create({
                                id_theme: info[0].id,
                                id_tutor: tutor.id
                            });
                        }
                    });
                });
                res.json({ status: 'success?' });
                if (!Array.isArray(file)) {
                    const dir = process.env.DIR_FILE_UPLOADS || path_1.default.resolve(__dirname, '..', '..', 'uploaded');
                    file.mv(dir, (err) => {
                        if (err) {
                            next({ error: err, custom: false });
                        }
                        else {
                            res.json({ status: 'success', message: messages_1.tutorMessage["request.success"] });
                        }
                    });
                    return;
                }
            })
                .catch((e) => {
                next({ error: e, custom: false });
            });
        });
    }
    static addTheme(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.id_theme && (!req.body.name)) {
                next({ error: messages_1.requestMessage["params.missing"], custom: true });
                return;
            }
            // @ts-ignore
            const id_tutor = req.user.id_tutor;
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
                next({ error: e, custom: false });
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
                next({ error: e, custom: false });
            });
        });
    }
}
exports.default = TutorController;
