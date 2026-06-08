import { pgTable, uuid, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectTypeEnum = pgEnum("project_type", [
  "commercial",
  "residential",
  "industrial",
  "healthcare",
  "mixed_use",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "pre_construction",
  "in_progress",
  "topped_out",
  "completed",
]);

export const quoteStatusEnum = pgEnum("quote_status", [
  "new",
  "reviewing",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
]);

export const leadSourceEnum = pgEnum("lead_source", [
  "website",
  "referral",
  "trade_show",
  "cold_outreach",
  "repeat_client",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  type: projectTypeEnum("type").notNull(),
  status: projectStatusEnum("status").default("pre_construction").notNull(),
  location: text("location").notNull(),
  sqft: integer("sqft").notNull(),
  valueCents: integer("value_cents").notNull(),
  year: integer("year").notNull(),
  description: text("description").notNull(),
  client: text("client"),
  completionDate: text("completion_date"),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  source: leadSourceEnum("source").default("website").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectType: projectTypeEnum("project_type").notNull(),
  scope: text("scope").notNull(),
  budgetCents: integer("budget_cents").notNull(),
  timeline: text("timeline", { enum: ["urgent", "3-6mo", "6-12mo", "planning"] }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  status: quoteStatusEnum("status").default("new").notNull(),
  leadId: uuid("lead_id").references(() => leads.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  role: text("role"),
  quote: text("quote").notNull(),
  photo: text("photo"),
  projectId: uuid("project_id").references(() => projects.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const equipment = pgTable("equipment", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  model: text("model").notNull(),
  capacity: text("capacity").notNull(),
  category: text("category", { enum: ["crane", "excavator", "hauler", "loader", "drill"] }).notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  year: integer("year").notNull(),
});

export const certifications = pgTable("certifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  expiresAt: timestamp("expires_at"),
  badge: text("badge"),
});

export const insertLeadSchema = createInsertSchema(leads, {
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  message: z.string().min(10, "Please provide more detail (10+ chars)"),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests, {
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  scope: z.string().min(20, "Tell us more about your project (20+ chars)"),
  budgetCents: z.number().positive("Budget is required"),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;

export type Project = typeof projects.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Equipment = typeof equipment.$inferSelect;
export type Certification = typeof certifications.$inferSelect;