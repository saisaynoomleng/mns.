import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema.js';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const SessionTable = t.pgTable(
  'sessions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    expiresAt: t.timestamp('expires_at').notNull(),
    token: t.text('token').notNull().unique(),
    ipAddress: t.text('ip_address'),
    userAgent: t.text('user_agent'),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    impersonatedBy: t.text('impersonated_by'),
    ...timestamps,
  },
  (table) => [t.index('sessions_userId_idx').on(table.userId)],
);

export type inferInsertSession = InferInsertModel<typeof SessionTable>;
export type inferSelectSession = InferSelectModel<typeof SessionTable>;

export const insertSessionSchema = createInsertSchema(SessionTable);
export const selectSessionSchema = createSelectSchema(SessionTable);
