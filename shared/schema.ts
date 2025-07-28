import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  institution: text("institution").notNull(),
  fieldOfStudy: text("field_of_study").notNull(),
  attendanceMode: text("attendance_mode").notNull(), // "online" or "on-campus"
  coursesOfInterest: text("courses_of_interest").array().notNull(),
  reasonForJoining: text("reason_for_joining").notNull(),
  referralCode: text("referral_code"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  graduationYear: text("graduation_year").notNull(),
  faculty: text("faculty").notNull(),
  testimonialText: text("testimonial_text").notNull(),
  photoUrl: text("photo_url"),
  currentRole: text("current_role"),
  company: text("company"),
  linkedinUrl: text("linkedin_url"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  isApproved: true,
}).extend({
  photoUrl: z.string().optional(),
  currentRole: z.string().optional(),
  company: z.string().optional(),
  linkedinUrl: z.string().optional(),
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
