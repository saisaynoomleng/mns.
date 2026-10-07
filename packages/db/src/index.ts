import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from './relations.js';
import { Pool } from 'pg';

const globalDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const pool =
  globalDb.pool ??
  new Pool({ connectionString: process.env.DATABASE_URL!, max: 20 });

if (process.env.NODE_ENV === 'production') {
  globalDb.pool = pool;
}

const db = drizzle({ client: pool, relations });

export default db;

export * from './schema/index.js';
export * from './lib/types.js';
