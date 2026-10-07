import * as t from 'drizzle-orm/pg-core';

export const RateLimitTable = t.pgTable('rate_limits', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  key: t.text('key').notNull().unique(),
  count: t.integer('count').notNull(),
  lastRequest: t.bigint('last_request', { mode: 'number' }).notNull(),
});
