import { Request, Response, NextFunction } from "express";
import { requestMessage, themeMessage } from "../config/messages";
import Theme from "../db/models/theme";

class ThemeController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.name) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }

        const { name } = req.body;
        const description = (req.body.description) ? req.body.description : null;
        const id_theme_parent = (req.body.id_theme_parent) ? req.body.id_theme_parent : 0;
        Theme.findOrCreate({
            where: { name },
            defaults: {
                id_theme_parent: parseInt(id_theme_parent),
                name,
                description
            }
        }).then((info) => {
            if(info[1])
                res.json({ status: 'success', theme: info[0] });
            else
                next({ error: themeMessage["theme.exists"], custom: true });
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

export default ThemeController;