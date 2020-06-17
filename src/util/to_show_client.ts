import User, { UserRole } from "../db/models/user";

export function userToShowClient(user: User) {
    const toShow: any = user.get({ plain: true, clone: true });
    toShow.roles = [ UserRole.STUDENT ];
    if(toShow.passwords) delete toShow.passwords;
    if(toShow.role_tutor) {
        delete toShow.role_tutor;
        toShow.roles.push(UserRole.TUTOR);
    }
    if(toShow.role_administrator) {
        delete toShow.role_administrator;
        toShow.roles.push(UserRole.ADMINISTRATOR);
    }
    return toShow;
}