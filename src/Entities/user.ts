import { encryptPassword } from '../services/hash';

class User {
    protected id: number|null;
    protected email: string;
    protected password: string|null;
    protected dni: number;
    protected status: number;
    protected isAdmin: boolean;
    protected createdAt: Date|null;
    protected modifiedAt: Date|null;

    constructor(data: { 
        id: number|null, 
        email: string, 
        password: string|null, 
        dni: number, 
        status: number,
        isAdmin: boolean,
        createdAt: Date|null,
        modifiedAt: Date|null
    }) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.dni = data.dni;
        this.status = data.status;
        this.isAdmin = data.isAdmin;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
    }

    setPassword(password: string, passwordRepite: string) {
        const self = this;
        return new Promise((resolve, reject) => {
            if(password != passwordRepite) return reject('Las contraseñas no coinciden');
            encryptPassword(password)
                .then((hash) => {
                    if(typeof hash == 'string') {
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

export default User;