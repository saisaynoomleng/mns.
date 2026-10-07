import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const VerificationTable = t.pgTable(
  'verifications',
  {
    id: t.uuid('id').defaultRandom().primaryKey(),
    identifier: t.text('identifier').notNull(),
    value: t.text('value').notNull(),
    expiresAt: t.timestamp('expires_at').notNull(),
  },
  (table) => [t.index('verifications_identifier_idx').on(table.identifier)],
);

export type inferInsertVerification = InferInsertModel<
  typeof VerificationTable
>;
export type inferSelectVerification = InferSelectModel<
  typeof VerificationTable
>;

export const insertVerificationSchema = createInsertSchema(VerificationTable);
export const selectVerificationSchema = createSelectSchema(VerificationTable);
