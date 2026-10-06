import * as t from 'drizzle-orm/pg-core';
import { contactStatus, timestamps } from './schema-helper.js';
import { sql, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const ContactTable = t.pgTable(
  'contacts',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    message: t.text('message'),
    companyName: t.varchar('company_name', { length: 255 }),
    position: t.varchar('position', { length: 255 }),
    minBudget: t.integer('min_budget').notNull(),
    maxBudget: t.integer('max_budget').notNull(),
    status: contactStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.check('budget_check', sql`${table.maxBudget} > ${table.minBudget}`),
  ],
);

export type inferInsertContact = InferInsertModel<typeof ContactTable>;
export type inferSelectContact = InferSelectModel<typeof ContactTable>;

export const InsertContactSchema = createInsertSchema(ContactTable);
export const SelectContactSchema = createSelectSchema(ContactTable);
