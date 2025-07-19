import dotenv from "dotenv";
// Load environment variables from .env file for local development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000");
  
  // Use 0.0.0.0 for Replit and cloud deployment, localhost for local development
  const host = process.env.HOST || process.env.IP || (
    process.env.REPL_ID || process.env.NODE_ENV === "production" || process.env.REPLIT_DEPLOYMENT || process.env.VERCEL ? "0.0.0.0" : "127.0.0.1"
  );
  
  // Only use reusePort in cloud environments that support it
  const useReusePort = process.env.REPLIT_DEPLOYMENT || process.env.NODE_ENV === "production";
  
  const listenOptions = {
    port,
    host,
    ...(useReusePort && { reusePort: true })
  };
  
  server.listen(listenOptions, () => {
    log(`serving on ${host}:${port}`);
    if (host === "127.0.0.1") {
      log(`Local development server: http://localhost:${port}`);
    }
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      server.listen(port + 1, host, () => {
        log(`serving on ${host}:${port + 1}`);
        log(`Local development server: http://localhost:${port + 1}`);
      });
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
})();
