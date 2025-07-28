import { 
  type Registration, 
  type InsertRegistration, 
  type Newsletter, 
  type InsertNewsletter,
  type Testimonial,
  type InsertTestimonial,
  type BlogPost,
  type InsertBlogPost,
  registrations, 
  newsletters,
  testimonials,
  blogPosts
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Registration methods
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  
  // Newsletter methods
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  approveTestimonial(id: string): Promise<Testimonial>;
  
  // Blog methods
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  publishBlogPost(id: string): Promise<BlogPost>;
}

export class DatabaseStorage implements IStorage {
  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const [registration] = await db
      .insert(registrations)
      .values(insertRegistration)
      .returning();
    return registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations);
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return await db.select().from(newsletters);
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db.select().from(newsletters).where(eq(newsletters.email, email));
    return newsletter || undefined;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.isApproved, true));
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async approveTestimonial(id: string): Promise<Testimonial> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ isApproved: true })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }

  // Blog methods implementation
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db
      .insert(blogPosts)
      .values({
        ...insertBlogPost,
        publishedAt: insertBlogPost.isPublished ? new Date() : null,
      })
      .returning();
    return blogPost;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [blogPost] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return blogPost || undefined;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [blogPost] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return blogPost || undefined;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [blogPost] = await db
      .update(blogPosts)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id));
  }

  async publishBlogPost(id: string): Promise<BlogPost> {
    const [blogPost] = await db
      .update(blogPosts)
      .set({ 
        isPublished: true, 
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost;
  }
}

export const storage = new DatabaseStorage();
