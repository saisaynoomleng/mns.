import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema.js';
import { testimonialStatus, timestamps } from './schema-helper.js';
import { sql, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const TestimonialTable = t.pgTable(
  'testimonials',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('userId')
      .references(() => UserTable.id, { onDelete: 'set null' }),
    userNameSnapshot: t
      .varchar('user_name_snapshot', { length: 255 })
      .notNull(),
    title: t.text('title').notNull(),
    rating: t.integer('rating').notNull().default(1),
    imageUrl: t.varchar('image_url', { length: 255 }),
    body: t.text('body').notNull(),
    status: testimonialStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.index('testimonial_userId_idx').on(table.userId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);

export type inferInsertTestimonial = InferInsertModel<typeof TestimonialTable>;
export type inferSelectTestimonial = InferSelectModel<typeof TestimonialTable>;

export const insertTestimonialSchema = createInsertSchema(TestimonialTable);
export const selectTestimonialSchema = createSelectSchema(TestimonialTable);
