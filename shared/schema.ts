import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  full_name: text("full_name").notNull(),
  supabase_id: text("supabase_id").unique(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  content: json("content").notNull(),
  ats_score: integer("ats_score").default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected, withdrawn
  applied_at: timestamp("applied_at").defaultNow(),
  notes: text("notes"),
});

export const user_profiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  skills: json("skills"), // {technical: [], soft: [], languages: []}
  preferences: json("preferences"), // search preferences, location, etc.
  linkedin: text("linkedin"),
  github: text("github"),
  phone: text("phone"),
  location: text("location"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  resumes: many(resumes),
  applications: many(applications),
  profile: one(user_profiles, {
    fields: [users.id],
    references: [user_profiles.user_id],
  }),
}));

export const resumesRelations = relations(resumes, ({ one }) => ({
  user: one(users, {
    fields: [resumes.user_id],
    references: [users.id],
  }),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.user_id],
    references: [users.id],
  }),
}));

export const userProfilesRelations = relations(user_profiles, ({ one }) => ({
  user: one(users, {
    fields: [user_profiles.user_id],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  full_name: true,
  supabase_id: true,
});

export const insertResumeSchema = createInsertSchema(resumes).pick({
  user_id: true,
  title: true,
  content: true,
  ats_score: true,
});

export const insertApplicationSchema = createInsertSchema(applications).pick({
  user_id: true,
  company: true,
  position: true,
  status: true,
  notes: true,
});

export const insertUserProfileSchema = createInsertSchema(user_profiles).pick({
  user_id: true,
  skills: true,
  preferences: true,
  linkedin: true,
  github: true,
  phone: true,
  location: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Resume = typeof resumes.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type UserProfile = typeof user_profiles.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
