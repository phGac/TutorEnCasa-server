"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToShowClient = void 0;
const user_model_1 = require("../db/models/user.model");
function userToShowClient(user) {
    const toShow = user.get({ plain: true, clone: true });
    toShow.roles = [user_model_1.UserRole.STUDENT];
    if (toShow.passwords)
        delete toShow.passwords;
    if (toShow.role_tutor || toShow.role_tutor == null) {
        if (toShow.role_tutor != null) {
            toShow.id_tutor = toShow.role_tutor.id;
            toShow.roles.push(user_model_1.UserRole.TUTOR);
        }
        delete toShow.role_tutor;
    }
    if (toShow.role_administrator || toShow.role_administrator == null) {
        if (toShow.role_administrator != null) {
            toShow.id_administrator = toShow.role_administrator.id;
            toShow.roles.push(user_model_1.UserRole.ADMINISTRATOR);
        }
        delete toShow.role_administrator;
    }
    return toShow;
}
exports.userToShowClient = userToShowClient;
