import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT || 4000,
  databaseURL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};