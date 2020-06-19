import User, { UserRole } from "../db/models/user";

export interface UserClient extends Express.User {
    id: number;
    id_administrator: number|undefined;
    id_tutor: number|undefined;
    firstname: string;
    lastname: string;
    email: string;
    dni: number;
    birthdate: Date;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export function userToShowClient(user: User): UserClient {
    const toShow: any = user.get({ plain: true, clone: true });
    toShow.roles = [ UserRole.STUDENT ];
    if(toShow.passwords) delete toShow.passwords;
    if(toShow.role_tutor) {
        toShow.id_tutor = toShow.role_tutor.id;
        delete toShow.role_tutor;
        toShow.roles.push(UserRole.TUTOR);
    }
    if(toShow.role_administrator) {
        toShow.id_administrator = toShow.role_administrator.id;
        delete toShow.role_administrator;
        toShow.roles.push(UserRole.ADMINISTRATOR);
    }
    return toShow;
}