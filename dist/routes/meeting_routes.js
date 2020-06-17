"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session_middleware");
const meeting_controller_1 = __importDefault(require("../controllers/meeting_controller"));
const router = express_1.Router();
/**
* @api {post} /meeting/new Crear Reunión
* @apiVersion 0.0.1
* @apiName CreateMeeting
* @apiGroup Reunión
* @apiPermission Tutor
*
* @apiDescription Permite crear una reunión
*
*
* @apiUse MeetingController
*/
router.post('/new', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, meeting_controller_1.default.create);
router.post('/join', session_middleware_1.isLoggedIn, meeting_controller_1.default.join);
router.post('/delete/:id', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, meeting_controller_1.default.destroy);
exports.default = router;
