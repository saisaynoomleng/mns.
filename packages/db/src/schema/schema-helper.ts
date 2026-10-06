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
