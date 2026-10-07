import * as t from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const contactStatus = t.pgEnum('contactStatus', [
  'new',
  'in_progress',
  'spam',
  'resolved',
]);

export const contactMessageStatus = t.pgEnum('contactMessageStatus', [
  'sent',
  'failed',
  'pending',
]);

export const contactMessageDirection = t.pgEnum('contactMessageDirection', [
  'inbound',
  'outbound',
]);

export const userRole = t.pgEnum('userRole', ['admin', 'super_admin', 'user']);

export const subscriptionStatus = t.pgEnum('subscriptionStatus', [
  'active',
  'inactive',
]);

export const testimonialStatus = t.pgEnum('testimonialStatus', [
  'new',
  'reviewed',
  'spam',
]);

export const userSubscriptionStatus = t.pgEnum('userSubscriptionStatus', [
  'active',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'past_due',
  'canceled',
  'paused',
  'unpaid',
]);

export const appStatus = t.pgEnum('appStatus', [
  'production',
  'development',
  'testing',
]);

export const appType = t.pgEnum('appType', [
  'health_care',
  'retail_and_commerce',
  'restaurant',
  'creative_media',
]);

export const billingInterval = t.pgEnum('billingInterval', [
  'monthly',
  'yearly',
]);

export const reportIssueStatus = t.pgEnum('reportIssueStatus', [
  'new',
  'in_progress',
  'awaiting_approval',
  'reopen',
  'resolved',
  'critical',
]);

export const featureRequestStatus = t.pgEnum('featureRequestStatus', [
  'under_review',
  'planned',
  'beta_testing',
  'in_progress',
  'declined',
  'new',
]);

export const invoiceSource = t.pgEnum('invoiceSource', [
  'subscription',
  'project_deposit',
  'project_balance',
  'one_off',
]);

export const currency = t.pgEnum('currency', ['usd', 'mmk']);

export const invoiceStatus = t.pgEnum('invoiceStatus', [
  'draft',
  'open',
  'paid',
  'void',
  'uncollectible',
  'refunded',
]);
