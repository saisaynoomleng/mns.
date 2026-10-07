import * as t from 'drizzle-orm/pg-core';
import { timestamps, userRole } from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  phone: t.varchar('phone', { length: 20 }).notNull(),
  emailVerified: t.boolean('email_verified').default(false).notNull(),
  companyName: t.varchar('company_name', { length: 255 }),
  position: t.varchar('position', { length: 255 }),
  imageUrl: t.varchar('image_url', { length: 255 }),
  banned: t.boolean('banned').default(false),
  banReason: t.text('ban_reason'),
  banExpires: t.timestamp('ban_expires'),
  role: userRole('role').notNull().default('user'),
  ...timestamps,
});

export type inferSelectUser = InferSelectModel<typeof UserTable>;
export type inferInsertUser = InferInsertModel<typeof UserTable>;

export const insertUserSchema = createInsertSchema(UserTable);
export const selectUserSchema = createSelectSchema(UserTable);
