// Load environment variables first
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Debug environment variable loading
console.log("🔍 Environment check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL available:", !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not found in environment variables");
  console.warn("   Using fallback to memory storage for development");
  console.warn("   To use database: copy .env.example to .env and configure DATABASE_URL");
}

let pool: any = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    console.warn("   Falling back to memory storage");
  }
} else {
  console.log("📝 Using memory storage (no DATABASE_URL configured)");
}

export { pool, db };