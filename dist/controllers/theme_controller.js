"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../config/messages");
const theme_1 = __importDefault(require("../db/models/theme"));
const logger_1 = __importDefault(require("../util/logger"));
class ThemeController {
    static create(req, res) {
        if (!req.body.name) {
            res.status(400).json({
                status: 'failed',
                error: messages_1.requestMessage["params.missing"]
            });
            return;
        }
        const { name } = req.body;
        const description = (req.body.description) ? req.body.description : null;
        const id_theme_parent = (req.body.id_theme_parent) ? req.body.id_theme_parent : 0;
        theme_1.default.findOrCreate({
            where: { name },
            defaults: {
                id_theme_parent: parseInt(id_theme_parent),
                name,
                description
            }
        }).then((info) => {
            if (info[1])
                res.json({ status: 'success', theme: info[0] });
            else
                res.status(400).json({ status: 'failed', error: messages_1.themeMessage["theme.exists"] });
        }).catch((e) => {
            logger_1.default().error(e);
            res.json({ status: 'failed', error: messages_1.requestMessage["error.unknow"] });
        });
    }
    static update() {
        //
    }
    static destroy() {
        //
    }
    static show() {
        //
    }
}
exports.default = ThemeController;
