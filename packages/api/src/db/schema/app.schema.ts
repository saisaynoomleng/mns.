import * as t from 'drizzle-orm/pg-core';
import { appStatus, appType, timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const AppTable = t.pgTable('apps', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  liveUrl: t.varchar('live_url', { length: 255 }).notNull(),
  demoUrl: t.varchar('demo_url', { length: 255 }).notNull(),
  status: appStatus('status').notNull().default('development'),
  myanmarOnly: t.boolean('myanmar_only').notNull().default(false),
  type: appType('type').notNull().default('creative_media'),
  excerpt: t.text('excerpt').notNull(),
  body: t.text('body').notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }),
  ...timestamps,
});

export type inferInsertApp = InferInsertModel<typeof AppTable>;
export type inferSelectApp = InferSelectModel<typeof AppTable>;

export const insertAppSchema = createInsertSchema(AppTable);
export const selectAppSchema = createSelectSchema(AppTable);
