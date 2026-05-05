import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { roomService } from "../services/room.service.js";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Multer config for room image uploads
// On Vercel, we use /tmp for temporary storage if UPLOAD_DIR is not available or writeable
const isProduction = process.env.NODE_ENV === "production";
const uploadDir = isProduction ? "/tmp" : (process.env.UPLOAD_DIR || "uploads");

// Only create directory if NOT on Vercel/Production (read-only filesystem)
if (!isProduction && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files allowed"));
}});

// GET /api/rooms - List rooms with filters
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const result = await roomService.list(req.query as any);
    res.json(result);
  } catch (e) { next(e); }
});

// GET /api/rooms/amenities - List all amenities
router.get("/amenities", requireAuth, async (_req, res, next) => {
  try { res.json(await roomService.getAmenities()); } catch (e) { next(e); }
});

// GET /api/rooms/popular - Popular rooms
router.get("/popular", requireAuth, async (req, res, next) => {
  try { res.json(await roomService.getPopular(Number(req.query.limit) || 4)); } catch (e) { next(e); }
});

// GET /api/rooms/:id - Room detail
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const r = await roomService.getById(req.params.id as string) || await roomService.getBySlug(req.params.id as string);
    if (!r) { res.status(404).json({ error: "Room not found" }); return; }
    res.json(r);
  } catch (e) { next(e); }
});

// GET /api/rooms/:id/schedule - Room schedule
router.get("/:id/schedule", requireAuth, async (req, res, next) => {
  try {
    const date = (req.query.date as string) || new Date().toISOString().split("T")[0];
    res.json(await roomService.getSchedule(req.params.id as string, date));
  } catch (e) { next(e); }
});

// GET /api/rooms/:id/availability - Room availability
router.get("/:id/availability", requireAuth, async (req, res, next) => {
  try {
    const date = (req.query.date as string) || new Date().toISOString().split("T")[0];
    res.json(await roomService.getAvailability(req.params.id as string, date));
  } catch (e) { next(e); }
});

// POST /api/rooms - Create room (Admin)
const createRoomSchema = z.object({ name: z.string().min(1), slug: z.string().min(1), floor: z.string().min(1), description: z.string().optional(), location: z.string().optional(), capacity: z.number().int().positive(), status: z.string().optional(), type: z.string().optional(), hourlyRate: z.string().optional(), rules: z.array(z.string()).optional(), amenityIds: z.array(z.string().uuid()).optional() });

router.post("/", requireAuth, requireAdmin, validate({ body: createRoomSchema }), async (req, res, next) => {
  try { res.status(201).json(await roomService.create(req.body)); } catch (e) { next(e); }
});

// PUT /api/rooms/:id - Update room (Admin)
const updateRoomSchema = z.object({ name: z.string().min(1).optional(), slug: z.string().min(1).optional(), floor: z.string().min(1).optional(), description: z.string().optional(), location: z.string().optional(), capacity: z.number().int().positive().optional(), status: z.string().optional(), type: z.string().optional(), hourlyRate: z.string().optional(), rules: z.array(z.string()).optional(), amenityIds: z.array(z.string().uuid()).optional() });

router.put("/:id", requireAuth, requireAdmin, validate({ body: updateRoomSchema }), async (req, res, next) => {
  try { res.json(await roomService.update(req.params.id as string, req.body)); } catch (e) { next(e); }
});

// DELETE /api/rooms/:id - Delete room (Admin)
router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try { await roomService.remove(req.params.id as string); res.status(204).end(); } catch (e) { next(e); }
});

// POST /api/rooms/:id/images - Upload room image (Admin)
router.post("/:id/images", requireAuth, requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) { res.status(400).json({ error: "No file uploaded" }); return; }
    const image = await roomService.addImage(req.params.id as string, req.file.path, req.file.originalname, Number(req.body.order) || 0);
    res.status(201).json(image);
  } catch (e) { next(e); }
});

// DELETE /api/rooms/:id/images/:imageId - Delete room image (Admin)
router.delete("/:id/images/:imageId", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const deleted = await roomService.removeImage(req.params.imageId as string);
    if (deleted?.filePath && fs.existsSync(deleted.filePath)) fs.unlinkSync(deleted.filePath);
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;
