import bcrypt from 'bcrypt';
import zxcvbn from 'zxcvbn';

export function encryptPassword(password: string) {
    return new Promise((resolve, reject) => {
        if(password.length < 6) return reject({ error: 'La constraseña es muy corta, mínimo 6 carácteres!', custom: true });
        const score = zxcvbn(password).score;
        if(score < 3) return reject({ error: new Error('La constraseña es debil'), custom: true });
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) return reject({ error: err, custom : false  });
            resolve(hash);
        });
    });
};
