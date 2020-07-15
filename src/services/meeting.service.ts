import { Chime, Endpoint, AWSError } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import logger from '../util/logger.util';
import { PromiseResult } from 'aws-sdk/lib/request';

const chime = new Chime({ 
    region: 'us-east-1',
    accessKeyId: process.env.AWS_CHIME_IAM_ID,
    secretAccessKey: process.env.AWS_CHIME_IAM_SECRET
});
chime.endpoint = new Endpoint(process.env.AWS_CHIME_ENDPOINT || 'https://service.chime.aws.amazon.com');
const meetingTable: { [key: string]: PromiseResult<Chime.CreateMeetingResponse, AWSError> } = {};

class MeetingService {
    static create(id: string, region: string) {
        return new Promise((resolve: (meeting: PromiseResult<Chime.CreateMeetingResponse, AWSError>) => void, reject: (e: { error: Error|string, custom: boolean }) => void) => {
            chime.createMeeting({
                ClientRequestToken: uuid(),
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
    static join(id: string) {
        return new Promise((resolve: (data: { Meeting: PromiseResult<Chime.CreateMeetingResponse, AWSError>, Attendee: PromiseResult<Chime.CreateAttendeeResponse, AWSError> }) => void, reject: (e: { error: Error|string, custom: boolean }) => void) => {
            if(! meetingTable[id]) return reject({ error: new Error('No encontrado'), custom: true });
            const meeting = meetingTable[id];
            if(! meeting.Meeting || ! meeting.Meeting.MeetingId) return reject({ error: new Error('No encontrado'), custom: true });
            chime.createAttendee({
                MeetingId: meeting.Meeting.MeetingId,
                ExternalUserId: uuid()
            }).promise()
                .then((attendee) => {
                    resolve({
                        Meeting: meeting,
                        Attendee: attendee
                    });
                })
                .catch((e) => {
                    logger(e);
                    reject({ error: e, custom: false });
                });
        });
    }
    static destroy(id: string) {
        chime.deleteMeeting({
            MeetingId: id
        }).promise()
            .catch((e) => {
                logger().error(e);
            });
    }
};

export default MeetingService;