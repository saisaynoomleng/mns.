import * as t from 'drizzle-orm/pg-core';
import { ServiceTable } from './service.schema.js';
import { subscriptionStatus, timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const SubscriptionTable = t.pgTable(
  'subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    serviceId: t
      .uuid('service_id')
      .references(() => ServiceTable.id, { onDelete: 'cascade' })
      .notNull(),
    name: t.varchar('name', { length: 255 }).notNull(),
    pricePerMonthInCents: t.integer('price_per_month_in_cents').notNull(),
    status: subscriptionStatus('status').notNull().default('active'),
    ...timestamps,
  },
  (table) => [t.index('subscriptions_serviceId_idx').on(table.serviceId)],
);

export type inferInsertSubscription = InferInsertModel<
  typeof SubscriptionTable
>;
export type inferSelectSubscription = InferSelectModel<
  typeof SubscriptionTable
>;

export const insertSubscriptionSchema = createInsertSchema(SubscriptionTable);
export const selectSubscriptionSchema = createSelectSchema(SubscriptionTable);
