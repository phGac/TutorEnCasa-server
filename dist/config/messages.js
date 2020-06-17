"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeMessage = exports.registerMessage = exports.loginMessage = exports.requestMessage = void 0;
exports.requestMessage = {
    'params.missing': 'Faltan parámetros para realizar la petición',
    'error.unknow': 'Error desconocido',
    'session.unloged': 'No te has logeado!',
    'session.already': 'Ya te has logeado',
    'user.role.notAllowed': 'No posees los permisos necesarios'
};
exports.loginMessage = {
    'user.email.wrong': 'Usuario y/o contraseña incorrecto(s)',
    'user.password.wrong': 'Usuario y/o contraseña incorrecto(s)',
    'user.email.undefined': 'El correo electrónico y contraseña son requeridos',
    'user.password.undefined': 'El correo electrónico y contraseña son requeridos',
    'user.token.notfound': 'El token es inválido',
    'user.hasNotPassword': 'El usuario no una contraseña'
};
exports.registerMessage = {
    'user.exists': 'El usuario ya posee una cuenta',
    'user.status.ok': 'Listo! sólo valida tu correo',
    'user.email.used': 'El correo ya se encuentra en uso!',
    'step.out': 'Paso del registro desconocido',
    'step.two.user.notFound': 'Usuario no encontrado'
};
exports.themeMessage = {
    'theme.exists': 'El tema ya existe'
};
