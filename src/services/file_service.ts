import fileUpload from "express-fileupload";
import path from 'path';
import { User, File } from "../db/models";

export function file_upload(file: fileUpload.UploadedFile, user: User) {
    return new Promise((resolve: (file: File) => void, reject) => {
        const { firstname, lastname } = user;
    
        const date = new Date();
        const date_filename = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}`;
        const filename = `${date_filename}-${firstname}_${lastname}.pdf`;
        const dir = process.env.DIR_FILE_UPLOADS || path.resolve(__dirname, '..', '..', 'uploads');
        const filepath = path.resolve(dir, filename);

        file.mv(filepath, (err) => {
            if(err) {
                reject({ error: err, custom: false });
            }
            else {
                File.create({
                    name: filename,
                    mime: file.mimetype,
                    path: filepath
                })
                .then((fileInstance) => {
                    resolve(fileInstance);
                })
                .catch((e) => {
                    reject({ error: e, custom: false });
                });
            }
        });
    });
}