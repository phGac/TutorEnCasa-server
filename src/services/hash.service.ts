import bcrypt from 'bcrypt';
import zxcvbn from 'zxcvbn';

export function encryptPassword(password: string, encrypt = true) {
    return new Promise((resolve, reject) => {
        if(password.length < 6) return reject({ error: new Error('La constraseña es muy corta, mínimo 6 carácteres!'), custom: true });
        const score = zxcvbn(password).score;
        if(score < 2) return reject({ error: new Error('La constraseña es débil'), custom: true });
        if(encrypt) {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) return reject({ error: err, custom : false  });
                resolve(hash);
            });
        }
        else {
            resolve();
        }
    });
};
