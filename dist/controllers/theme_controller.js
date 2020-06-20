"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../config/messages");
const theme_1 = __importDefault(require("../db/models/theme"));
class ThemeController {
    static create(req, res, next) {
        if (!req.body.name) {
            next({ error: messages_1.requestMessage["params.missing"], custom: true });
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
                next({ error: messages_1.themeMessage["theme.exists"], custom: true });
        }).catch((e) => {
            next({ error: e, custom: false });
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
