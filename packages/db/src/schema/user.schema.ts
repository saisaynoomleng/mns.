import * as t from 'drizzle-orm/pg-core';
import { timestamps, userRole } from './schema-helper.js';

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: t.boolean('email_verified').default(false).notNull(),
  companyName: t.varchar('company_name', { length: 255 }),
  position: t.varchar('position', { length: 255 }),
  imageUrl: t.varchar('image_url', { length: 255 }),
  banned: t.boolean('banned').default(false),
  banReason: t.text('ban_reason'),
  banExpires: t.timestamp('ban_expires'),
  phone: t.text('phone').notNull(),
  role: userRole('role').notNull().default('user'),
  ...timestamps,
});
