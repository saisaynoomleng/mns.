import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema.js';
import { SubscriptionTable } from './subscription.schema.js';
import { AppTable } from './app.schema.js';
import { PaymentProviderTable } from './payment-provider.schema.js';
import {
  billingInterval,
  timestamps,
  userSubscriptionStatus,
} from './schema-helper.js';
import { sql, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const UserSubscriptionTable = t.pgTable(
  'user_subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppTable.id, { onDelete: 'cascade' })
      .notNull(),
    paymentProviderId: t
      .uuid('payment_provider_id')
      .references(() => PaymentProviderTable.id, { onDelete: 'cascade' })
      .notNull(),
    stripeSubscriptionId: t
      .varchar('stripe_subscription_id', { length: 255 })
      .unique(),
    currentPeriodStart: t
      .timestamp('current_period_start', { withTimezone: true })
      .notNull(),
    currentPeriodEnd: t
      .timestamp('current_period_end', { withTimezone: true })
      .notNull(),
    billingIntervalSnapshot: billingInterval('billing_interval_snapshot')
      .notNull()
      .default('monthly'),
    status: userSubscriptionStatus('status').notNull().default('incomplete'),
    totalSnapshot: t.integer('total_snapshot').notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('userScription_appId_idx').on(table.appId),
    t.index('userScription_subscriptionId_idx').on(table.subscriptionId),
    t.index('userScription_userId_idx').on(table.userId),
    t.index('userScription_paymentProviderId_idx').on(table.paymentProviderId),
    t
      .index('userSubscription_stripeSubscriptionId_idx')
      .on(table.stripeSubscriptionId),
    t
      .index('userSubscripiton_active_idx')
      .on(table.userId)
      .where(sql`${table.status} = 'active'`),

    t.check('total_check', sql`${table.totalSnapshot} > 0`),
    t.check(
      'period_check',
      sql`${table.currentPeriodEnd} > ${table.currentPeriodStart}`,
    ),
  ],
);

export type inferInsertUserSubscription = InferInsertModel<
  typeof UserSubscriptionTable
>;
export type inferSelectUserSubscription = InferSelectModel<
  typeof UserSubscriptionTable
>;

export const insertUserSubscriptionSchema = createInsertSchema(
  UserSubscriptionTable,
);
export const selectUserSubscriptionSchema = createSelectSchema(
  UserSubscriptionTable,
);
