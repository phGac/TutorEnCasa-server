import Tutor from "../db/models/tutor";
import { FindOptions } from "sequelize/types";

export interface FindTutorOptions {
    include?: {
        classes?: boolean,
        times?: boolean,
        priceses?: boolean,
        students?: boolean
    },
    where: {
        [key: string]: string
    }
}

export function findTutor(options: FindTutorOptions) {
    return new Promise((resolve, reject) => {
        const findOptions: FindOptions = {
            where: options.where
        };
        if(options.include) {
            findOptions.include = [];
            if(options.include.classes) findOptions.include.push({ association: 'classess' });
            if(options.include.times) findOptions.include.push({ association: 'times' });
            if(options.include.priceses) findOptions.include.push({ association: 'priceses' });
            if(options.include.students) findOptions.include.push({ association: 'students' });
        }
        Tutor.findAll(findOptions)
            .then((tutors) => {
                resolve(tutors);
            })
            .catch((e) => {
                reject(e);
            });
    });
}