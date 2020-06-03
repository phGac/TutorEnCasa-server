"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const administrator_1 = __importDefault(require("./administrator"));
const class_1 = __importDefault(require("./class"));
const classrating_1 = __importDefault(require("./classrating"));
const historyaccess_1 = __importDefault(require("./historyaccess"));
const historypricehour_1 = __importDefault(require("./historypricehour"));
const historystatusclass_1 = __importDefault(require("./historystatusclass"));
const schedule_1 = __importDefault(require("./schedule"));
const studenttutor_1 = __importDefault(require("./studenttutor"));
const timeavailability_1 = __importDefault(require("./timeavailability"));
const tutor_1 = __importDefault(require("./tutor"));
const user_1 = __importDefault(require("./user"));
const models = {
    Administrator: administrator_1.default,
    Class: class_1.default,
    ClassRating: classrating_1.default,
    HistoryAccess: historyaccess_1.default,
    HistoryPriceHour: historypricehour_1.default,
    HistoryStatusClass: historystatusclass_1.default,
    Schedule: schedule_1.default,
    StudentTutor: studenttutor_1.default,
    TimeAvailability: timeavailability_1.default,
    Tutor: tutor_1.default,
    User: user_1.default,
};
Object.values(models).forEach((model) => {
    if ('associate' in model) {
        model.associate(models);
    }
});
