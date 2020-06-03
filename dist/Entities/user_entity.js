"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("../services/hash");
class UserEntity {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.dni = data.dni;
        this.status = data.status;
        this.isAdmin = data.isAdmin;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
    }
    setPassword(password, passwordRepite) {
        const self = this;
        return new Promise((resolve, reject) => {
            if (password != passwordRepite)
                return reject('Las contraseñas no coinciden');
            hash_1.encryptPassword(password)
                .then((hash) => {
                if (typeof hash == 'string') {
                    self.password = hash;
                    resolve();
                }
                else {
                    reject('El tipo de la variable es incorrecto');
                }
            })
                .catch(err => reject('Desconocido'));
        });
    }
}
exports.default = UserEntity;
