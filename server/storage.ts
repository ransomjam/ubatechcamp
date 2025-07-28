import { type Registration, type InsertRegistration, type Newsletter, type InsertNewsletter, registrations, newsletters } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Registration methods
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  
  // Newsletter methods
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
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
}

export const storage = new DatabaseStorage();
