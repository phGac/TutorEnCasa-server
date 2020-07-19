"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTime = exports.CouponGift = exports.ClassPayment = exports.TutorFileCertificate = exports.File = exports.Payment = exports.Coupon = exports.TutorTheme = exports.Theme = exports.HistoryPassword = exports.User = exports.Tutor = exports.AvailabilityTime = exports.Schedule = exports.HistoryStatusClass = exports.HistoryPriceHour = exports.HistoryAccess = exports.ClassRating = exports.Class = exports.Administrator = void 0;
const administrator_model_1 = __importDefault(require("./administrator.model"));
exports.Administrator = administrator_model_1.default;
const class_model_1 = __importDefault(require("./class.model"));
exports.Class = class_model_1.default;
const classrating_model_1 = __importDefault(require("./classrating.model"));
exports.ClassRating = classrating_model_1.default;
const historyaccess_model_1 = __importDefault(require("./historyaccess.model"));
exports.HistoryAccess = historyaccess_model_1.default;
const historypricehour_model_1 = __importDefault(require("./historypricehour.model"));
exports.HistoryPriceHour = historypricehour_model_1.default;
const historystatusclass_model_1 = __importDefault(require("./historystatusclass.model"));
exports.HistoryStatusClass = historystatusclass_model_1.default;
const schedule_model_1 = __importDefault(require("./schedule.model"));
exports.Schedule = schedule_model_1.default;
const availabilitytime_model_1 = __importDefault(require("./availabilitytime.model"));
exports.AvailabilityTime = availabilitytime_model_1.default;
const tutor_model_1 = __importDefault(require("./tutor.model"));
exports.Tutor = tutor_model_1.default;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const historypassword_model_1 = __importDefault(require("./historypassword.model"));
exports.HistoryPassword = historypassword_model_1.default;
const theme_model_1 = __importDefault(require("./theme.model"));
exports.Theme = theme_model_1.default;
const tutortheme_model_1 = __importDefault(require("./tutortheme.model"));
exports.TutorTheme = tutortheme_model_1.default;
const coupon_model_1 = __importDefault(require("./coupon.model"));
exports.Coupon = coupon_model_1.default;
const payment_model_1 = __importDefault(require("./payment.model"));
exports.Payment = payment_model_1.default;
const file_model_1 = __importDefault(require("./file.model"));
exports.File = file_model_1.default;
const tutorfilecertificate_model_1 = __importDefault(require("./tutorfilecertificate.model"));
exports.TutorFileCertificate = tutorfilecertificate_model_1.default;
const classpayment_1 = __importDefault(require("./classpayment"));
exports.ClassPayment = classpayment_1.default;
const coupongift_model_1 = __importDefault(require("./coupongift.model"));
exports.CouponGift = coupongift_model_1.default;
const classtime_model_1 = __importDefault(require("./classtime.model"));
exports.ClassTime = classtime_model_1.default;
