import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { relations } from './relations.js';
import env, { isProd } from '../lib/env.js';
import { remember } from '@epic-web/remember';
import { isTest } from 'better-auth';

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: env.DATABASE_POOL_MAX,
  });

  pool.on('error', (err) => {
    console.error('DB Pool Error', err);
  });

  return pool;
};

let client: Pool;

if (isProd()) {
  client = createPool();
} else {
  client = remember('db pool', () => createPool());
}

const db = drizzle({ client, relations, logger: isTest() ? false : true });
export default db;
