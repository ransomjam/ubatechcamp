import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleFileUpload } from "./upload";
import { insertRegistrationSchema, insertNewsletterSchema, insertTestimonialSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // File upload endpoint
  app.post("/api/upload", handleFileUpload);

  // Serve uploaded files statically
  app.use('/uploads', express.static('uploads'));
  
  // Registration endpoint
  app.post("/api/registration", async (req, res) => {
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validatedData);
      res.status(201).json({ success: true, data: registration });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  // Get registrations endpoint
  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getRegistrations();
      res.json({ success: true, data: registrations });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      if (existing) {
        res.status(409).json({ success: false, message: "Email already subscribed" });
        return;
      }

      const newsletter = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json({ success: true, data: newsletter });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  // Testimonials endpoints
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json({ success: true, data: testimonial });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json({ success: true, data: testimonials });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/testimonials/all", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json({ success: true, data: testimonials });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/testimonials/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.approveTestimonial(id);
      res.json({ success: true, data: testimonial });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Blog endpoints
  app.get("/api/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getPublishedBlogPosts();
      res.json({ success: true, data: blogPosts });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const blogPost = await storage.getBlogPostBySlug(slug);
      if (!blogPost) {
        res.status(404).json({ success: false, message: "Blog post not found" });
        return;
      }
      res.json({ success: true, data: blogPost });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      // All new blog posts start as unpublished (require approval)
      const blogPost = await storage.createBlogPost({
        ...validatedData,
        isPublished: false,
      });
      res.status(201).json({ success: true, data: blogPost });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  app.get("/api/blog/unapproved", async (req, res) => {
    try {
      const blogPosts = await storage.getUnapprovedBlogPosts();
      res.json({ success: true, data: blogPosts });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/blog/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const blogPost = await storage.publishBlogPost(id);
      res.json({ success: true, data: blogPost });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
