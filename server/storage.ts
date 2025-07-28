import { type Registration, type InsertRegistration, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Registration methods
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  
  // Newsletter methods
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private registrations: Map<string, Registration>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.registrations = new Map();
    this.newsletters = new Map();
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = {
      ...insertRegistration,
      id,
      createdAt: new Date(),
    };
    this.registrations.set(id, registration);
    return registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values());
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      createdAt: new Date(),
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }
}

export const storage = new MemStorage();
