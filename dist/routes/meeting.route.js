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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_middleware_1 = require("../middlewares/session.middleware");
const meeting_controller_1 = __importStar(require("../controllers/meeting.controller"));
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
router.post('/new', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, meeting_controller_1.MeetingValidatorController.create, meeting_controller_1.default.create);
router.post('/join', session_middleware_1.isLoggedIn, meeting_controller_1.MeetingValidatorController.join, meeting_controller_1.default.join);
router.delete('/:id', session_middleware_1.isLoggedIn, session_middleware_1.isTutor, meeting_controller_1.MeetingValidatorController.destroy, meeting_controller_1.default.destroy);
exports.default = router;
