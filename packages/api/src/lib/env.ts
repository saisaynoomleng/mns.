import dotenv from 'dotenv';

const isDeveloping = process.env.APP_STAGE === 'dev';

dotenv.config({
  path: isDeveloping ? '.env' : '.env.test',
});
