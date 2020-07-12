import { UploadedFile } from "express-fileupload";
import { S3 } from 'aws-sdk';

import { User, File } from "../db/models";

const configS3: S3.ClientConfiguration = {
    accessKeyId: process.env.AWS_S3_IAM_ID || '',
    secretAccessKey: process.env.AWS_S3_IAM_SECRET || '',
    signatureVersion: 'v2',
};

class FileService {
    private static s3: S3 = new S3(configS3);

    static upload(file: UploadedFile, user: User) {
        return new Promise((resolve: (file: { name: string, mime: string, key: string }) => void, reject) => {
            const { firstname, lastname } = user;
            
            const date = new Date();
            const date_filename = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}`;
            const filename = `${date_filename}-${firstname}_${lastname}.pdf`;
    
            const params: S3.PutObjectRequest = {
                Bucket: process.env.AWS_S3_BUCKET || '',
                Key: filename,
                Body: file.data,
            };
            this.s3.upload(params, function(err: Error, data: S3.ManagedUpload.SendData) { //{ partSize: 10 * 1024 * 1024, queueSize: 4 },
                if (err) {
                    reject({ error: err, custom: false });
                }
                else {
                    resolve({
                        name: filename,
                        mime: file.mimetype,
                        key: data.Key
                    });
                }
            });
        });
    }

    static download(key: string) {
        const options = {
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: key
        };
        const stream = this.s3.getObject(options).createReadStream();
        return stream;
    }
}

export default FileService;