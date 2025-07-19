import { users, resumes, applications, user_profiles, type User, type InsertUser, type Resume, type Application, type UserProfile, type InsertResume, type InsertApplication, type InsertUserProfile } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserBySupabaseId(supabaseId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume methods
  getUserResumes(userId: number): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, resume: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<boolean>;
  
  // Application methods
  getUserApplications(userId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined>;
  
  // Profile methods
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createOrUpdateProfile(profile: InsertUserProfile): Promise<UserProfile>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserBySupabaseId(supabaseId: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.supabase_id, supabaseId));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not available");
    const [user] = await db.insert(users).values({
      ...insertUser,
      created_at: new Date(),
      updated_at: new Date(),
    }).returning();
    return user;
  }

  async getUserResumes(userId: number): Promise<Resume[]> {
    if (!db) return [];
    return await db.select().from(resumes).where(eq(resumes.user_id, userId));
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    if (!db) throw new Error("Database not available");
    const [newResume] = await db.insert(resumes).values({
      ...resume,
      created_at: new Date(),
      updated_at: new Date(),
    }).returning();
    return newResume;
  }

  async updateResume(id: number, resume: Partial<InsertResume>): Promise<Resume | undefined> {
    if (!db) return undefined;
    const [updatedResume] = await db.update(resumes)
      .set({ ...resume, updated_at: new Date() })
      .where(eq(resumes.id, id))
      .returning();
    return updatedResume || undefined;
  }

  async deleteResume(id: number): Promise<boolean> {
    if (!db) return false;
    const result = await db.delete(resumes).where(eq(resumes.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    if (!db) return [];
    return await db.select().from(applications).where(eq(applications.user_id, userId));
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    if (!db) throw new Error("Database not available");
    const [newApplication] = await db.insert(applications).values({
      ...application,
      applied_at: new Date(),
    }).returning();
    return newApplication;
  }

  async updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined> {
    if (!db) return undefined;
    const [updatedApplication] = await db.update(applications)
      .set(application)
      .where(eq(applications.id, id))
      .returning();
    return updatedApplication || undefined;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    if (!db) return undefined;
    const [profile] = await db.select().from(user_profiles).where(eq(user_profiles.user_id, userId));
    return profile || undefined;
  }

  async createOrUpdateProfile(profile: InsertUserProfile): Promise<UserProfile> {
    if (!db) throw new Error("Database not available");
    
    const existing = await this.getUserProfile(profile.user_id);
    if (existing) {
      const [updatedProfile] = await db.update(user_profiles)
        .set({ ...profile, updated_at: new Date() })
        .where(eq(user_profiles.user_id, profile.user_id))
        .returning();
      return updatedProfile;
    } else {
      const [newProfile] = await db.insert(user_profiles).values({
        ...profile,
        created_at: new Date(),
        updated_at: new Date(),
      }).returning();
      return newProfile;
    }
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private applications: Map<number, Application>;
  private profiles: Map<number, UserProfile>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.applications = new Map();
    this.profiles = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserBySupabaseId(supabaseId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.supabase_id === supabaseId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      supabase_id: insertUser.supabase_id || null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUserResumes(userId: number): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(resume => resume.user_id === userId);
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const id = this.currentId++;
    const newResume: Resume = {
      ...resume,
      id,
      ats_score: resume.ats_score || 0,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.resumes.set(id, newResume);
    return newResume;
  }

  async updateResume(id: number, resume: Partial<InsertResume>): Promise<Resume | undefined> {
    const existing = this.resumes.get(id);
    if (existing) {
      const updated = { ...existing, ...resume, updated_at: new Date() };
      this.resumes.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.user_id === userId);
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const id = this.currentId++;
    const newApplication: Application = {
      ...application,
      id,
      status: application.status || 'pending',
      notes: application.notes || null,
      applied_at: new Date(),
    };
    this.applications.set(id, newApplication);
    return newApplication;
  }

  async updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined> {
    const existing = this.applications.get(id);
    if (existing) {
      const updated = { ...existing, ...application };
      this.applications.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return Array.from(this.profiles.values()).find(profile => profile.user_id === userId);
  }

  async createOrUpdateProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const existing = await this.getUserProfile(profile.user_id);
    if (existing) {
      const updated = { ...existing, ...profile, updated_at: new Date() };
      this.profiles.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentId++;
      const newProfile: UserProfile = {
        ...profile,
        id,
        skills: profile.skills || null,
        preferences: profile.preferences || null,
        linkedin: profile.linkedin || null,
        github: profile.github || null,
        phone: profile.phone || null,
        location: profile.location || null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.profiles.set(id, newProfile);
      return newProfile;
    }
  }
}

// Use DatabaseStorage if database is available, otherwise fall back to MemStorage
export const storage = db ? new DatabaseStorage() : new MemStorage();
