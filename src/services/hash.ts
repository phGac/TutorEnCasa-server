import bcrypt from 'bcrypt';
import zxcvbn from 'zxcvbn';

export function encryptPassword(password: string) {
    return new Promise((resolve, reject) => {
        if(password.length < 6) return reject('La constraseña es muy corta, mínimo 6 carácteres!');
        const score = zxcvbn(password).score;
        if(score < 3) return reject('La constraseña es debil');
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) return reject(err);
            resolve(hash);
        });
    });
};
