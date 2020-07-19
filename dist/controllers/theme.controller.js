"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeValidatorController = void 0;
const messages_1 = require("../config/messages");
const models_1 = require("../db/models");
class ThemeValidatorController {
    static show(req, res, next) {
        next();
    }
    static create(req, res, next) {
        next();
    }
    static update(req, res, next) {
        next();
    }
    static destroy(req, res, next) {
        next();
    }
}
exports.ThemeValidatorController = ThemeValidatorController;
class ThemeController {
    static create(req, res, next) {
        if (!req.body.name) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        const { name } = req.body;
        const description = (req.body.description) ? req.body.description : null;
        const id_theme_parent = (req.body.id_theme_parent) ? req.body.id_theme_parent : 0;
        models_1.Theme.findOrCreate({
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
                next({ error: new Error(messages_1.themeMessage["theme.exists"]), custom: true });
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
