import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import { UserTable } from './user.schema.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const AccountTable = t.pgTable(
  'accounts',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    accountId: t.text('account_id').notNull(),
    providerId: t.text('provider_id').notNull(),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    accessToken: t.text('access_token'),
    refreshToken: t.text('refresh_token'),
    idToken: t.text('id_token'),
    accessTokenExpiresAt: t.timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: t.timestamp('refresh_token_expires_at'),
    scope: t.text('scope'),
    password: t.text('password'),
    ...timestamps,
  },
  (table) => [t.index('accounts_userId_idx').on(table.userId)],
);

export type inferInsertAccount = InferInsertModel<typeof AccountTable>;
export type inferSelectAccount = InferSelectModel<typeof AccountTable>;

export const insertAccountSchema = createInsertSchema(AccountTable);
export const selectAccountSchema = createSelectSchema(AccountTable);
