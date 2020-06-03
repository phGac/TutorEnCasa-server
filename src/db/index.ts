import { Sequelize } from 'sequelize';
import enviroment from '../config/env';

const sequelize = new Sequelize(enviroment.DB);
export default sequelize;

import './models'; // configura la asociacion los modelos