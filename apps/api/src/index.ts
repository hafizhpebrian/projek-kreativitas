import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db/index.js";
import { booking } from "./db/schema.js";
import { lt, and, eq, sql } from "drizzle-orm";

import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import calendarRoutes from "./routes/calendar.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import reportRoutes from "./routes/report.routes.js";
import userRoutes from "./routes/user.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Increased limit during development
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: "Too many requests, please try again later." }
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadDir = process.env.UPLOAD_DIR || "uploads";
app.use("/uploads", express.static(path.resolve(uploadDir)));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[ERROR]", err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Background Job Middleware for Vercel
let lastJobRun = 0;
app.use((req, res, next) => {
  const now = Date.now();
  // Run max once per minute (60000ms)
  if (now - lastJobRun > 60000) {
    lastJobRun = now;
    (async () => {
      try {
        const currentDate = new Date();
        await db.update(booking)
          .set({ status: "cancelled", cancellationReason: "Payment expired", updatedAt: new Date() })
          .where(and(eq(booking.status, "pending"), lt(booking.paymentExpiresAt, currentDate)));

        await db.execute(sql`
          UPDATE booking 
          SET status = 'overdue', penalty_amount = '0.00', updated_at = CURRENT_TIMESTAMP
          WHERE status IN ('confirmed', 'waiting_checkout') 
            AND (date + end_time) < CURRENT_TIMESTAMP
        `);

        await db.execute(sql`
          UPDATE booking
          SET penalty_amount = GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - (date + end_time))) / 900) * 125000),
              updated_at = CURRENT_TIMESTAMP
          WHERE status = 'overdue' AND (date + end_time) < CURRENT_TIMESTAMP
        `);
      } catch (error) {
        console.error("Background job error:", error);
      }
    })();
  }
  next();
});

app.listen(PORT, () => {
  console.log(`\n  🚀 SI-BOOK API running at http://localhost:${PORT}`);
  console.log(`  📖 Health check: http://localhost:${PORT}/api/health\n`);
});

export default app;
