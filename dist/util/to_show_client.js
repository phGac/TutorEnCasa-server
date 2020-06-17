"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToShowClient = void 0;
const user_1 = require("../db/models/user");
function userToShowClient(user) {
    const toShow = user.get({ plain: true, clone: true });
    toShow.roles = [user_1.UserRole.STUDENT];
    if (toShow.passwords)
        delete toShow.passwords;
    if (toShow.role_tutor) {
        delete toShow.role_tutor;
        toShow.roles.push(user_1.UserRole.TUTOR);
    }
    if (toShow.role_administrator) {
        delete toShow.role_administrator;
        toShow.roles.push(user_1.UserRole.ADMINISTRATOR);
    }
    return toShow;
}
exports.userToShowClient = userToShowClient;
