import { Sequelize, Options } from 'sequelize';
import dbConfig from '../config/sql';

const env: string = process.env.NODE_ENV || 'development';
// @ts-ignore
const db: Options = dbConfig[env];

const sequelize = new Sequelize(db);
export default sequelize;

import './models'; // configura la asociacion los modelos