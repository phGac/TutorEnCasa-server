import { AvailabilityTime } from "../db/models";
import { where, fn, col, Op, FindOptions } from "sequelize";
import { AvailabilityTimeStatus } from "../db/models/availabilitytime.model";

interface AvailabilityTimeDate {
    day: number;
    start: Date;
    finish:  Date;
}

class TutorService {
    private static toDate(hour: number|string, minute: number|string) {
        minute = (typeof minute == 'number' && minute < 10) ? `0${minute}` : minute;
        hour = (typeof hour == 'number' && hour < 10) ? `0${hour}` : hour;
        return Date.parse(`01/01/2020 ${hour}:${minute}:00`);
    }

    static isAvailable(id_tutor: number, date: Date, minutes: number, validateTimes = false) {
        return new Promise((resolve: (times: AvailabilityTime[]|null) => void, reject) => {

            const options: FindOptions = {
                where: {
                    id_tutor,
                    status: AvailabilityTimeStatus.ACTIVE,
                    start: {
                        [Op.between]: [ date.toISOString(), this.addMinutes(date, minutes).toISOString() ]
                    },
                },
                order: [ 'start' ]
            };
            AvailabilityTime.findAll(options)
                .then((times) => {
                    if(times.length == 0)
                        return resolve(null);
                    else if(! validateTimes)
                        return resolve(times);
                    
                    const timesDone = [];
                    let lastFinish: Date|null = null;
                    let total = 0;
                    for (let index = 0; index < times.length; index++) {
                        const time = times[index];
                        if(lastFinish != null) {
                            if(lastFinish.getTime() !== time.start.getTime()) {
                                resolve(null);
                                return;
                            }
                        }
                        timesDone.push(time);
                        total += time.minutes;
                        lastFinish = this.addMinutes(time.start, time.minutes);
                        if(total >= minutes)
                            break;
                    }
                    if(total >= minutes)
                        resolve(timesDone);
                    else
                        resolve(null);
                })
                .catch((e) => {
                    reject({ error: e, custom: false });
                });
        });
    }

    static weekAvailableTimes(id_tutor: number, date: Date = new Date()) {
        return new Promise((resolve: (times: AvailabilityTime[]) => void, reject) => {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            nextWeek.setHours(0, 0, 0, 0);
            const options: FindOptions = {
                attributes: ['id', 'start', 'minutes'],
                where: { 
                    id_tutor,
                    status: AvailabilityTimeStatus.ACTIVE,
                    start: {
                        [Op.between]: [ date.toISOString(), nextWeek.toISOString() ]
                    },
                }
            };
            AvailabilityTime.findAll(options)
                .then((times) => {
                    resolve(times);
                })
                .catch((e) => {
                    reject({ error: e, custom: false });
                });
        });
    }

    static addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000);
    }
}

export default TutorService;