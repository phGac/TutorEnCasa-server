import { Request, Response } from "express";
import { requestMessage, themeMessage } from "../config/messages";
import Theme from "../db/models/theme";
import logger from "../util/logger";

class ThemeController {
    static create(req: Request, res: Response) {
        if(! req.body.name) {
            res.status(400).json({
                status: 'failed',
                error: requestMessage["params.missing"]
            });
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
                res.status(400).json({ status: 'failed', error: themeMessage["theme.exists"] });
        }).catch((e) => {
            logger().error(e);
            res.json({ status: 'failed', error: requestMessage["error.unknow"] });
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