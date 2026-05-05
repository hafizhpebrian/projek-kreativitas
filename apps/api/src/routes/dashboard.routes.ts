import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { dashboardService } from "../services/dashboard.service.js";
import { roomService } from "../services/room.service.js";

const router = Router();

router.get("/stats", requireAuth, async (_req, res, next) => {
  try { res.json(await dashboardService.getStats()); } catch (e) { next(e); }
});

router.get("/upcoming", requireAuth, async (req, res, next) => {
  try { res.json(await dashboardService.getUpcoming(req.user!.id, req.user!.role, Number(req.query.limit) || 5)); } catch (e) { next(e); }
});

router.get("/popular-rooms", requireAuth, async (req, res, next) => {
  try { res.json(await roomService.getPopular(Number(req.query.limit) || 4)); } catch (e) { next(e); }
});

export default router;
