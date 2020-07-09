import { FindOptions, fn, where } from "sequelize";

import { AvailabilityTime, Class } from "../db/models";
import { AvailabilityTimeStatus } from "../db/models/availabilitytime.model";

interface AvailabilityTimeDate {
    day: number;
    start: {
        hour: number;
        minutes: number;
    } | Date;
    finish: {
        hour: number;
        minutes: number;
    } | Date;
}

class TutorService {
    private static toDate(hour: number|string, minute: number|string) {
        minute = (typeof minute == 'number' && minute < 10) ? `0${minute}` : minute;
        hour = (typeof hour == 'number' && hour < 10) ? `0${hour}` : hour;
        return Date.parse(`01/01/2020 ${hour}:${minute}:00`);
    }

    static isAvailable(id_tutor: number, date: AvailabilityTimeDate) {
        return new Promise((resolve :(id_time: number|null) => void, reject) => {
            const options: FindOptions = {
                where: { 
                    id_tutor,
                    status: AvailabilityTimeStatus.ACTIVE
                },
            };
            AvailabilityTime.findAll(options)
                .then((times) => {
                    if(times.length == 0) {
                        resolve(null);
                        return;
                    }

                    resolve(null);
                    /*
                    const hout_start = (date.start instanceof Date) ? date.start.getHours() : date.start.hour;
                    const hout_finish = (date.finish instanceof Date) ? date.finish.getHours() : date.finish.hour;
                    const minute_start = (date.start instanceof Date) ? date.start.getMinutes() : date.start.minutes;
                    const minute_finish = (date.finish instanceof Date) ? date.finish.getMinutes() : date.finish.minutes;
                    const time = times.find((time) => 
                        (
                            this.toDate(time.hour_start, time.minute_start) <= this.toDate(hout_start, minute_start) &&
                            this.toDate(time.hour_finish, time.minute_finish) >= this.toDate(hout_finish, minute_finish)
                        )
                    );
                    if(! time) {
                        resolve(null);
                        return;
                    }
                    console.log(time);
                    resolve(null);
                    */
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