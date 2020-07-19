"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/doc/api', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'resources', 'public', 'doc', 'api', 'index.html'));
});
router.get('/doc/app', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'resources', 'public', 'doc', 'app', 'index.html'));
});
router.get('/reports/local', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'resources', 'public', 'reports', 'local.html'));
});
router.get('/reports/server', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'resources', 'public', 'reports', 'server.html'));
});
router.get('/*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'resources', 'public', 'index.html'));
});
exports.default = router;
