import Administrator from './administrator';
import Class from './class';
import ClassRating from './classrating';
import HistoryAccess from './historyaccess';
import HistoryPriceHour from './historypricehour';
import HistoryStatusClass from './historystatusclass';
import Schedule from './schedule';
import StudentTutor from './studenttutor';
import TimeAvailability from './timeavailability';
import Tutor from './tutor';
import User from './user';

const models: any = { 
	Administrator,
	Class,
	ClassRating,
	HistoryAccess,
	HistoryPriceHour,
	HistoryStatusClass,
	Schedule,
	StudentTutor,
	TimeAvailability,
	Tutor,
	User,
};

Object.values(models).forEach((model: any) => {
	if('associate' in model) {
		model.associate(models);
	}
});
