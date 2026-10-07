import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema.js';
import { AppTable } from './app.schema.js';
import { UserSubscriptionTable } from './user-subscription.schema.js';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const WorkspaceTable = t.pgTable(
  'workspaces',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppTable.id, { onDelete: 'cascade' })
      .notNull(),
    userSubscriptionId: t
      .uuid('user_subscription_id')
      .references(() => UserSubscriptionTable.id, { onDelete: 'set default' })
      .notNull(),
    name: t.varchar('name', { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('workspace_userId_idx').on(table.userId),
    t.index('workspace_appId_idx').on(table.appId),
    t.index('workspace_userSubscriptionId_idx').on(table.userSubscriptionId),
  ],
);

export type inferInsertWorkspace = InferInsertModel<typeof WorkspaceTable>;
export type inferSelectWorkspace = InferSelectModel<typeof WorkspaceTable>;

export const insertWorkspaceSchema = createInsertSchema(WorkspaceTable);
export const selectWorkspaceSchema = createSelectSchema(WorkspaceTable);
