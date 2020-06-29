import { Sequelize, Options } from 'sequelize';
import dbConfig from '../config/db';

const env: string = process.env.NODE_ENV || 'development';
// @ts-ignore
const db: Options = dbConfig[env];

const sequelize = new Sequelize(db);
export default sequelize;

import * as models from './models';

Object.values(models).forEach((model: any) => {
	if('associate' in model) {
		model.associate(models);
	}
});
