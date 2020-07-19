"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponMessage = exports.tutorMessage = exports.themeMessage = exports.registerMessage = exports.loginMessage = exports.requestMessage = void 0;
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
    'user.email.formatError': 'El formato del correo electrónico es incorrecto',
    'user.password.undefined': 'El correo electrónico y contraseña son requeridos',
    'user.token.notfound': 'El token es inválido',
    'user.hasNotPassword': 'El usuario no tiene una contraseña'
};
exports.registerMessage = {
    'user.exists': 'El usuario ya posee una cuenta',
    'user.status.ok': 'Listo! sólo valida tu correo',
    'user.email.used': 'El correo ya se encuentra en uso!',
    'user.email.invalid': 'El correo es inválido',
    'user.dni.invalid': 'El rut es inválido',
    'user.birthday.invalid': 'La fecha de nacimiento es inválida',
    'step.out': 'Paso del registro desconocido',
    'step.two.user.notFound': 'Usuario no encontrado'
};
exports.themeMessage = {
    'theme.exists': 'El tema ya existe'
};
exports.tutorMessage = {
    'request.success': 'Pronto recibirás una notificación!',
    'request.file.failed': 'Presentamos un error al subir el archivo'
};
exports.couponMessage = {
    'user.email.self': 'No puedes compartir tu cupon a tí mismo',
    'user.notFound': 'El usuario no se ha encontrado',
    'coupon.notFound': 'El cupon no existe',
    'coupon.owner.isAnother': 'El cupon no te pertenece',
};
