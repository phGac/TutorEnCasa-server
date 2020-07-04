import fileUpload from "express-fileupload";
import { S3 } from 'aws-sdk';

import { User, File } from "../db/models";
import { Response } from "express";

const s3 = new S3({
    accessKeyId: process.env.AWS_S3_IAM_ID || '',
    secretAccessKey: process.env.AWS_S3_IAM_SECRET || ''
});

export function file_upload(file: fileUpload.UploadedFile, user: User) {
    return new Promise((resolve: (file: File) => void, reject) => {
        const { firstname, lastname } = user;
    
        const date = new Date();
        const date_filename = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}`;
        const filename = `${date_filename}-${firstname}_${lastname}.pdf`;
        //const dir = process.env.DIR_FILE_UPLOADS || path.resolve(__dirname, '..', '..', 'uploads');
        //const filepath = path.resolve(dir, filename);

        const params: S3.PutObjectRequest = {
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: filename,
            Body: file.data
        };
        s3.upload(params, function(err: Error, data: S3.ManagedUpload.SendData) {
            if (err) {
                return reject({ error: err, custom: false });
            }
            else {
                File.create({
                    name: filename,
                    mime: file.mimetype,
                    url: data.Location,
                    key: data.Key
                })
                .then((fileInstance) => {
                    resolve(fileInstance);
                })
                .catch((e) => {
                    reject({ error: e, custom: false });
                });
            }
        });

        /*
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
        */
    });
}

export function file_download(file: File, res: Response) {
    const options = {
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: file.key
    };
    const stream = s3.getObject(options).createReadStream();
    stream.pipe(res);
}