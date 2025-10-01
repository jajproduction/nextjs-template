import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  user_id: uuid('user_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  verified: integer('verified').default(0),
  role: varchar('role', { length: 50 }).default('user'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
})
