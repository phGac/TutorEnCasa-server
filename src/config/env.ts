import path from 'path';
import { config } from 'dotenv';

const dot = config({ path: path.resolve(__dirname, '..', '..', '.env') });

switch (dot.parsed?.NODE_ENV) {
    case 'dev':
    case 'development':
        break;
    case 'test':
        break;
    case 'prod':
    case 'production':
        break;
}

const variables = {
    PORT: '80',
    ...dot.parsed
};

export default variables;