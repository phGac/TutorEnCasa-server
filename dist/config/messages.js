"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessage = exports.registerMessage = exports.loginMessage = void 0;
exports.loginMessage = {
    'user.email.wrong': 'Usuario y/o contraseña incorrecto(s)',
    'user.password.wrong': 'Usuario y/o contraseña incorrecto(s)',
    'user.email.undefined': 'El correo electrónico y contraseña son requeridos',
    'user.password.undefined': 'El correo electrónico y contraseña son requeridos',
    'user.token.notfound': 'El token es inválido',
};
exports.registerMessage = {
    'user.exists': 'El usuario ya posee una cuenta',
    'user.status.ok': 'Listo! sólo valida tu correo'
};
exports.chatMessage = {
    'user.notFound': 'Ususario no encontrado'
};
