import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: 'mysql'
});
export default sequelize;

import './models'; // configura la asociacion los modelos