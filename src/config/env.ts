import path from 'path';
import { config } from 'dotenv';

const dotenv = config({ path: path.resolve(__dirname, '..', '..', '.env') });

export default dotenv.parsed;