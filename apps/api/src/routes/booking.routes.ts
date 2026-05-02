import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { bookingService } from "../services/booking.service.js";
import { z } from "zod";

const router = Router();

// GET /api/bookings/my
router.get("/my", requireAuth, async (req, res, next) => {
  try { res.json(await bookingService.getMyBookings(req.user!.id, req.query.status as string)); } catch (e) { next(e); }
});

// GET /api/bookings
router.get("/", requireAuth, requireAdmin, async (req, res, next) => {
  try { res.json(await bookingService.getAll({ status: req.query.status as string })); } catch (e) { next(e); }
});

// GET /api/bookings/:id
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const b = await bookingService.getById(req.params.id as string);
    if (!b) { res.status(404).json({ error: "Booking not found" }); return; }
    res.json(b);
  } catch (e) { next(e); }
});

// POST /api/bookings
const createSchema = z.object({ roomId: z.string().uuid(), title: z.string().min(1), date: z.string(), startTime: z.string(), endTime: z.string(), attendees: z.number().int().positive(), notes: z.string().optional(), isPrivate: z.boolean().optional(), paymentMethod: z.string().optional() });
router.post("/", requireAuth, validate({ body: createSchema }), async (req, res, next) => {
  try { res.status(201).json(await bookingService.create({ ...req.body, userId: req.user!.id })); } catch (e: any) {
    if (e.message?.includes("conflict") || e.message?.includes("capacity") || e.message?.includes("time")) { res.status(409).json({ error: e.message }); return; }
    next(e);
  }
});

// PATCH /api/bookings/:id
const updateSchema = z.object({ title: z.string().min(1).optional(), date: z.string().optional(), startTime: z.string().optional(), endTime: z.string().optional(), attendees: z.number().int().positive().optional(), notes: z.string().optional(), isPrivate: z.boolean().optional() });
router.patch("/:id", requireAuth, validate({ body: updateSchema }), async (req, res, next) => {
  try { res.json(await bookingService.update(req.params.id as string, req.user!.id, req.body, req.user!.role)); } catch (e: any) {
    if (e.message?.includes("Not authorized")) { res.status(403).json({ error: e.message }); return; }
    if (e.message?.includes("conflict")) { res.status(409).json({ error: e.message }); return; }
    next(e);
  }
});

// PATCH /api/bookings/:id/cancel
const cancelSchema = z.object({ reason: z.string().optional() });
router.patch("/:id/cancel", requireAuth, validate({ body: cancelSchema }), async (req, res, next) => {
  try { res.json(await bookingService.cancel(req.params.id as string, req.user!.id, req.body.reason, req.user!.role)); } catch (e: any) {
    if (e.message?.includes("Not authorized")) { res.status(403).json({ error: e.message }); return; }
    next(e);
  }
});

// PATCH /api/bookings/:id/pay
router.patch("/:id/pay", requireAuth, async (req, res, next) => {
  try { res.json(await bookingService.payBooking(req.params.id as string, req.user!.id, req.user!.role)); } catch (e: any) {
    if (e.message?.includes("Not authorized")) { res.status(403).json({ error: e.message }); return; }
    res.status(400).json({ error: e.message });
  }
});

// PATCH /api/bookings/:id/checkin
router.patch("/:id/checkin", requireAuth, requireAdmin, async (req, res, next) => {
  try { res.json(await bookingService.adminCheckIn(req.params.id as string)); } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH /api/bookings/:id/user-checkout
router.patch("/:id/user-checkout", requireAuth, async (req, res, next) => {
  try { res.json(await bookingService.userCheckout(req.params.id as string, req.user!.id, req.user!.role)); } catch (e: any) {
    if (e.message?.includes("Not authorized")) { res.status(403).json({ error: e.message }); return; }
    res.status(400).json({ error: e.message });
  }
});

// PATCH /api/bookings/:id/approve-checkout
router.patch("/:id/approve-checkout", requireAuth, requireAdmin, async (req, res, next) => {
  try { res.json(await bookingService.adminApproveCheckout(req.params.id as string)); } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
