"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const configS3 = {
    accessKeyId: process.env.AWS_S3_IAM_ID || '',
    secretAccessKey: process.env.AWS_S3_IAM_SECRET || '',
    signatureVersion: 'v2',
};
class FileService {
    static upload(file, user) {
        return new Promise((resolve, reject) => {
            const { firstname, lastname } = user;
            const date = new Date();
            const date_filename = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}`;
            const filename = `${date_filename}-${firstname}_${lastname}.pdf`;
            const params = {
                Bucket: process.env.AWS_S3_BUCKET || '',
                Key: filename,
                Body: file.data,
            };
            this.s3.upload(params, function (err, data) {
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
    static download(key) {
        const options = {
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: key
        };
        const stream = this.s3.getObject(options).createReadStream();
        return stream;
    }
}
FileService.s3 = new aws_sdk_1.S3(configS3);
exports.default = FileService;
