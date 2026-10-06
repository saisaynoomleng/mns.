import * as t from 'drizzle-orm/pg-core';

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  companyName: t.varchar('company_name', { length: 255 }),
  position: t.varchar('position', { length: 255 }),
});
