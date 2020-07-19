"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const chime = new aws_sdk_1.Chime({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_CHIME_IAM_ID,
    secretAccessKey: process.env.AWS_CHIME_IAM_SECRET
});
chime.endpoint = new aws_sdk_1.Endpoint(process.env.AWS_CHIME_ENDPOINT || 'https://service.chime.aws.amazon.com');
const meetingTable = {};
class MeetingService {
    static create(id, region) {
        return new Promise((resolve, reject) => {
            chime.createMeeting({
                ClientRequestToken: uuid_1.v4(),
                MediaRegion: region,
                ExternalMeetingId: id
            }).promise()
                .then((meeting) => {
                meetingTable[id] = meeting;
                resolve(meeting);
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static join(id) {
        return new Promise((resolve, reject) => {
            if (!meetingTable[id])
                return reject({ error: new Error('Llamada no encontrada'), custom: true });
            const meeting = meetingTable[id];
            if (!meeting.Meeting || !meeting.Meeting.MeetingId)
                return reject({ error: new Error('Llamada no encontrada'), custom: true });
            chime.createAttendee({
                MeetingId: meeting.Meeting.MeetingId,
                ExternalUserId: uuid_1.v4()
            }).promise()
                .then((attendee) => {
                resolve({
                    Meeting: meeting,
                    Attendee: attendee
                });
            })
                .catch((e) => {
                logger_util_1.default(e);
                reject({ error: e, custom: false });
            });
        });
    }
    static destroy(id) {
        if (meetingTable[id]) {
            delete meetingTable[id];
            chime.deleteMeeting({
                MeetingId: id
            }).promise()
                .catch((e) => {
                logger_util_1.default().error(e);
            });
        }
    }
}
;
exports.default = MeetingService;
