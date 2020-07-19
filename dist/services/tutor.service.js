"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const sequelize_1 = require("sequelize");
const availabilitytime_model_1 = require("../db/models/availabilitytime.model");
class TutorService {
    static toDate(hour, minute) {
        minute = (typeof minute == 'number' && minute < 10) ? `0${minute}` : minute;
        hour = (typeof hour == 'number' && hour < 10) ? `0${hour}` : hour;
        return Date.parse(`01/01/2020 ${hour}:${minute}:00`);
    }
    static isAvailable(id_tutor, date, minutes, validateTimes = false) {
        return new Promise((resolve, reject) => {
            const options = {
                where: {
                    id_tutor,
                    status: availabilitytime_model_1.AvailabilityTimeStatus.ACTIVE,
                    start: {
                        [sequelize_1.Op.between]: [date.toISOString(), this.addMinutes(date, minutes).toISOString()]
                    },
                },
                order: ['start']
            };
            models_1.AvailabilityTime.findAll(options)
                .then((times) => {
                if (times.length == 0)
                    return resolve(null);
                else if (!validateTimes)
                    return resolve(times);
                const timesDone = [];
                let lastFinish = null;
                let total = 0;
                for (let index = 0; index < times.length; index++) {
                    const time = times[index];
                    if (lastFinish != null) {
                        if (lastFinish.getTime() !== time.start.getTime()) {
                            resolve(null);
                            return;
                        }
                    }
                    timesDone.push(time);
                    total += time.minutes;
                    lastFinish = this.addMinutes(time.start, time.minutes);
                    if (total >= minutes)
                        break;
                }
                if (total >= minutes)
                    resolve(timesDone);
                else
                    resolve(null);
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static weekAvailableTimes(id_tutor, date = new Date()) {
        return new Promise((resolve, reject) => {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            nextWeek.setHours(0, 0, 0, 0);
            const options = {
                attributes: ['id', 'start', 'minutes'],
                where: {
                    id_tutor,
                    status: availabilitytime_model_1.AvailabilityTimeStatus.ACTIVE,
                    start: {
                        [sequelize_1.Op.between]: [date.toISOString(), nextWeek.toISOString()]
                    },
                }
            };
            models_1.AvailabilityTime.findAll(options)
                .then((times) => {
                resolve(times);
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
}
exports.default = TutorService;
