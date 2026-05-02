import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { reportService } from "../services/report.service.js";

const router = Router();

function getDateRange(req: any) {
  const now = new Date();
  const startDate = (req.query.startDate as string) || new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const endDate = (req.query.endDate as string) || now.toISOString().split("T")[0];
  return { startDate, endDate };
}

router.get("/kpi", requireAuth, requireAdmin, async (req, res, next) => {
  try { const { startDate, endDate } = getDateRange(req); res.json(await reportService.getKPI(startDate, endDate)); } catch (e) { next(e); }
});

router.get("/trends", requireAuth, requireAdmin, async (req, res, next) => {
  try { const { startDate, endDate } = getDateRange(req); res.json(await reportService.getTrends(startDate, endDate)); } catch (e) { next(e); }
});

router.get("/by-department", requireAuth, requireAdmin, async (req, res, next) => {
  try { const { startDate, endDate } = getDateRange(req); res.json(await reportService.getByDepartment(startDate, endDate)); } catch (e) { next(e); }
});

router.get("/room-utilization", requireAuth, requireAdmin, async (req, res, next) => {
  try { const { startDate, endDate } = getDateRange(req); res.json(await reportService.getRoomUtilization(startDate, endDate)); } catch (e) { next(e); }
});

export default router;
