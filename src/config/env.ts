import path from 'path';
import { config } from 'dotenv';
import { Options } from 'sequelize/types';

const dot = config({ path: path.resolve(__dirname, '..', '..', '.env') });

let DB: Options = { username: '', password: '', host: '', database: '', dialect: 'mysql' };
switch (dot.parsed?.NODE_ENV) {
    case 'dev':
    case 'development':
        DB = {
            username: dot.parsed.DB_USER_DEV,
            password: dot.parsed.DB_PASS_DEV,
            database: dot.parsed.DB_NAME_DEV,
            host: dot.parsed.DB_HOST_DEV,
            // @ts-ignore
            dialect: dot.parsed.DB_TYPE_DEV
        };
        break;
    case 'test':
        DB = {
            username: dot.parsed.DB_USER_TEST,
            password: dot.parsed.DB_PASS_TEST,
            database: dot.parsed.DB_NAME_TEST,
            host: dot.parsed.DB_HOST_TEST,
            // @ts-ignore
            dialect: dot.parsed.DB_TYPE_TEST
        };
        break;
    case 'prod':
    case 'production':
        DB = {
            username: dot.parsed.DB_USER_PROD,
            password: dot.parsed.DB_PASS_PROD,
            database: dot.parsed.DB_NAME_PROD,
            host: dot.parsed.DB_HOST_PROD,
            // @ts-ignore
            dialect: dot.parsed.DB_TYPE_PROD
        };
        break;
}

const variables = {
    PORT: '80',
    ...dot.parsed,
    DB
};

export default variables;