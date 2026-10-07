import * as t from 'drizzle-orm/pg-core';
import { SubscriptionTable } from './subscription.schema.js';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const SubscriptionNotIncludedFeatureTable = t.pgTable(
  'subscription_not_included_features',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionTable.id, { onDelete: 'cascade' })
      .notNull(),
    body: t.text('body').notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('not_included_feature_subscriptionId_idx').on(table.subscriptionId),
  ],
);

export type inferInsertSubscriptionNotIncludedFeature = InferInsertModel<
  typeof SubscriptionNotIncludedFeatureTable
>;
export type inferSelectSubscriptionNotIncludedFeature = InferSelectModel<
  typeof SubscriptionNotIncludedFeatureTable
>;

export const insertSubscriptionNotIncludedFeatureSchema = createInsertSchema(
  SubscriptionNotIncludedFeatureTable,
);
export const selectSubscriptionNotIncludedFeatureSchema = createSelectSchema(
  SubscriptionNotIncludedFeatureTable,
);
