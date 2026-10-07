import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema.js';
import { AppTable } from './app.schema.js';
import { reportIssueStatus, timestamps } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const ReportIssueTable = t.pgTable(
  'report_issues',
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
    body: t.text('body').notNull(),
    status: reportIssueStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.index('issue_userId_idx').on(table.userId),
    t.index('issue_appId_idx').on(table.appId),
    t.index('issue_status').on(table.appId, table.status),
  ],
);

export type inferInsertReportIssue = InferInsertModel<typeof ReportIssueTable>;
export type inferSelectReportIssue = InferSelectModel<typeof ReportIssueTable>;

export const insertReportIssueSchema = createInsertSchema(ReportIssueTable);
export const selectReportIssueSchema = createSelectSchema(ReportIssueTable);
