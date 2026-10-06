import * as t from 'drizzle-orm/pg-core';
import { ContactTable } from './contact.schema.js';
import {
  contactMessageDirection,
  contactMessageStatus,
  timestamps,
} from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const ContactMessageTable = t.pgTable(
  'contact_messages',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    contactId: t
      .uuid('contact_id')
      .references(() => ContactTable.id, { onDelete: 'cascade' })
      .notNull(),
    direction: contactMessageDirection('direction')
      .notNull()
      .default('outbound'),
    message: t.text('text').notNull(),
    status: contactMessageStatus('status').notNull().default('pending'),
    ...timestamps,
  },
  (table) => [t.index('contact_message_contactId_idx').on(table.contactId)],
);

export type inferInsertContactMessage = InferInsertModel<
  typeof ContactMessageTable
>;
export type inferSelectContactMessage = InferSelectModel<
  typeof ContactMessageTable
>;

export const InsertContactMessageSchema =
  createInsertSchema(ContactMessageTable);
export const SelectContactMessageSchema =
  createSelectSchema(ContactMessageTable);
