"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meeting_service_1 = __importDefault(require("../services/meeting_service"));
const messages_1 = require("../config/messages");
const logger_1 = __importDefault(require("../util/logger"));
class MeetingController {
    static create(req, res) {
        if (!req.body.id) {
            res.json({
                satus: 'failed',
                error: messages_1.requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.body;
        meeting_service_1.default.create(id, 'sa-east-1')
            .then(() => {
            meeting_service_1.default.join(id)
                .then((data) => {
                res.json(data);
            })
                .catch(e => {
                if (!e.custom) {
                    logger_1.default().error(e.error);
                    res.json({ satus: 'failed', error: messages_1.requestMessage["error.unknow"] });
                }
                else {
                    res.json({ satus: 'failed', error: e.error });
                }
            });
        })
            .catch((e) => {
            if (!e.custom) {
                logger_1.default().error(e.error);
                res.json({ satus: 'failed', error: messages_1.requestMessage["error.unknow"] });
            }
            else {
                res.json({ satus: 'failed', error: e.error });
            }
        });
    }
    static join(req, res) {
        if (!req.body.id) {
            res.json({
                error: messages_1.requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.body;
        meeting_service_1.default.join(id)
            .then((data) => {
            res.json(data);
        })
            .catch(e => {
            if (!e.custom) {
                logger_1.default().error(e.error);
                res.json({ error: messages_1.requestMessage["error.unknow"] });
            }
            else {
                res.json({ error: e.error });
            }
        });
    }
    static destroy(req, res) {
        if (!req.body.id) {
            res.json({
                satus: 'failed',
                error: messages_1.requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.body;
        meeting_service_1.default.destroy(id);
    }
}
exports.default = MeetingController;
