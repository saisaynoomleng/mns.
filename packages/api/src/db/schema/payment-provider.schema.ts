import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const PaymentProviderTable = t.pgTable('payment_providers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  ...timestamps,
});

export type inferInsertPaymentProvider = InferInsertModel<
  typeof PaymentProviderTable
>;
export type inferSelectPaymentProvider = InferSelectModel<
  typeof PaymentProviderTable
>;

export const insertPaymentProviderSchema =
  createInsertSchema(PaymentProviderTable);
export const selectPaymentProviderSchema =
  createSelectSchema(PaymentProviderTable);
