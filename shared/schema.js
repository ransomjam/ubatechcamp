import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const registrations = pgTable("registrations", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
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
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const testimonials = pgTable("testimonials", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
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
export const blogPosts = pgTable("blog_posts", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: text("title").notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    featuredImage: text("featured_image"),
    contentImages: text("content_images").array(),
    authorName: text("author_name").notNull(),
    category: varchar("category", { length: 100 }),
    tags: text("tags").array(),
    isPublished: boolean("is_published").default(false),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
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
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    excerpt: z.string().optional(),
    featuredImage: z.string().optional(),
    contentImages: z.array(z.string()).optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
    publishedAt: z.date().optional(),
});
