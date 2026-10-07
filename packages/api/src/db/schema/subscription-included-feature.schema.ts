import * as t from 'drizzle-orm/pg-core';
import { SubscriptionTable } from './subscription.schema.js';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const SubscriptionIncludedFeatureTable = t.pgTable(
  'subscription_included_features',
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
    t.index('included_feature_subscriptionId_idx').on(table.subscriptionId),
  ],
);

export type inferInsertSubscriptionIncludedFeature = InferInsertModel<
  typeof SubscriptionIncludedFeatureTable
>;
export type inferSelectSubscriptionIncludedFeature = InferSelectModel<
  typeof SubscriptionIncludedFeatureTable
>;

export const insertSubscriptionIncludedFeatureSchema = createInsertSchema(
  SubscriptionIncludedFeatureTable,
);
export const selectSubscriptionIncludedFeatureSchema = createSelectSchema(
  SubscriptionIncludedFeatureTable,
);
