import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { adminService } from "../services/admin.service.js";

const router = Router();

router.get("/stats", requireAuth, requireAdmin, async (_req, res, next) => {
  try { res.json(await adminService.getStats()); } catch (e) { next(e); }
});

router.get("/activity", requireAuth, requireAdmin, async (req, res, next) => {
  try { res.json(await adminService.getActivity(Number(req.query.limit) || 20)); } catch (e) { next(e); }
});

router.get("/users", requireAuth, requireAdmin, async (_req, res, next) => {
  try { res.json(await adminService.getUsers()); } catch (e) { next(e); }
});

router.patch("/users/:id/role", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) { res.status(400).json({ error: "Invalid role" }); return; }
    res.json(await adminService.updateUserRole(req.params.id as string, role));
  } catch (e) { next(e); }
});

export default router;
