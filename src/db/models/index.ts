import Administrator from './administrator';
import Class from './class';
import ClassRating from './classrating';
import HistoryAccess from './historyaccess';
import HistoryPriceHour from './historypricehour';
import HistoryStatusClass from './historystatusclass';
import Schedule from './schedule';
import StudentTutor from './studenttutor';
import AvailabilityTime from './availabilitytime';
import Tutor from './tutor';
import User from './user';
import HistoryPassword from './historypassword';
import HistoryStatusUser from './historystatususer';

const models: any = { 
	Administrator,
	Class,
	ClassRating,
	HistoryAccess,
	HistoryPriceHour,
	HistoryStatusClass,
	Schedule,
	StudentTutor,
	AvailabilityTime,
	Tutor,
	User,
	HistoryPassword,
	HistoryStatusUser,
};

Object.values(models).forEach((model: any) => {
	if('associate' in model) {
		model.associate(models);
	}
});
