import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const ServiceTable = t.pgTable(
  'services',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    priceInCents: t.integer('price_in_cents').notNull(),
    subtitle: t.text('subtitle').notNull(),
    excerpt: t.text('excerpt').notNull(),
    body: t.text('body'),
    imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [t.check('price_check', sql`${table.priceInCents} > 0`)],
);
