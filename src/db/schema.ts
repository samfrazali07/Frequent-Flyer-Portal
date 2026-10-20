import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  memberId: varchar("member_id", { length: 64 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  tier: varchar("tier", { length: 32 }).notNull().default("Standard"),
  balance: integer("balance").notNull().default(0),
  status: varchar("status", { length: 32 }).notNull().default("Active"),
  joinDate: timestamp("join_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  transactionId: varchar("transaction_id", { length: 64 }).notNull().unique(),
  memberId: varchar("member_id", { length: 64 }).notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  amount: integer("amount").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  resultingBalance: integer("resulting_balance").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DbMember = typeof members.$inferSelect;
export type DbNewMember = typeof members.$inferInsert;
export type DbTransaction = typeof transactions.$inferSelect;
export type DbNewTransaction = typeof transactions.$inferInsert;
