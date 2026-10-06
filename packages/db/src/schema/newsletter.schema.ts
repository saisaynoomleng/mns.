import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const NewsletterTable = t.pgTable('newsletter', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  ...timestamps,
});

export type inferSelectNewsletter = InferSelectModel<typeof NewsletterTable>;
export type inferInsertNewsletter = InferInsertModel<typeof NewsletterTable>;

export const InsertNewsletterSchema = createInsertSchema(NewsletterTable);
export const SelectNewsletterSchema = createSelectSchema(NewsletterTable);
