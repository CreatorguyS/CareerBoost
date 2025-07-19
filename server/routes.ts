import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertResumeSchema, insertApplicationSchema, insertUserProfileSchema } from "@shared/schema";

// For Vercel serverless functions
export function setupRoutes(app: Express): void {
  setupAPIRoutes(app);
}

// For traditional server deployment
export async function registerRoutes(app: Express): Promise<Server> {
  setupAPIRoutes(app);
  const httpServer = createServer(app);
  return httpServer;
}

function setupAPIRoutes(app: Express): void {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "CareerBoost API is running" });
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.get("/api/users/email/:email", async (req, res) => {
    try {
      const user = await storage.getUserByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/users/supabase/:supabaseId", async (req, res) => {
    try {
      const user = await storage.getUserBySupabaseId(req.params.supabaseId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Resume routes
  app.get("/api/users/:userId/resumes", async (req, res) => {
    try {
      const resumes = await storage.getUserResumes(parseInt(req.params.userId));
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: "Failed to get resumes" });
    }
  });

  app.post("/api/resumes", async (req, res) => {
    try {
      const validatedData = insertResumeSchema.parse(req.body);
      const resume = await storage.createResume(validatedData);
      res.status(201).json(resume);
    } catch (error) {
      res.status(400).json({ error: "Invalid resume data" });
    }
  });

  app.put("/api/resumes/:id", async (req, res) => {
    try {
      const validatedData = insertResumeSchema.partial().parse(req.body);
      const resume = await storage.updateResume(parseInt(req.params.id), validatedData);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(400).json({ error: "Invalid resume data" });
    }
  });

  app.delete("/api/resumes/:id", async (req, res) => {
    try {
      const success = await storage.deleteResume(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete resume" });
    }
  });

  // Application routes
  app.get("/api/users/:userId/applications", async (req, res) => {
    try {
      const applications = await storage.getUserApplications(parseInt(req.params.userId));
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to get applications" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  app.put("/api/applications/:id", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.partial().parse(req.body);
      const application = await storage.updateApplication(parseInt(req.params.id), validatedData);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  // Profile routes
  app.get("/api/users/:userId/profile", async (req, res) => {
    try {
      const profile = await storage.getUserProfile(parseInt(req.params.userId));
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to get profile" });
    }
  });

  app.post("/api/profiles", async (req, res) => {
    try {
      const validatedData = insertUserProfileSchema.parse(req.body);
      const profile = await storage.createOrUpdateProfile(validatedData);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  // Dashboard route
  app.get("/api/users/:userId/dashboard", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const [resumes, applications, profile] = await Promise.all([
        storage.getUserResumes(userId),
        storage.getUserApplications(userId),
        storage.getUserProfile(userId)
      ]);

      const dashboardData = {
        resumes: {
          count: resumes.length,
          recent: resumes.slice(0, 3)
        },
        applications: {
          total: applications.length,
          byStatus: applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          recent: applications.slice(0, 5)
        },
        profile,
        achievements: {
          applicationsCount: applications.length,
          interviewsCount: applications.filter(app => app.status === 'interview').length,
          offersCount: applications.filter(app => app.status === 'accepted').length,
          resumeScore: resumes.length > 0 ? resumes[0].ats_score : 0
        }
      };

      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: "Failed to get dashboard data" });
    }
  });

  // AI API routes
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GOOGLE_AI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Google AI API key not configured" });
      }

      // Import Google AI module
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ text });
    } catch (error) {
      console.error('Error generating AI response:', error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

}
