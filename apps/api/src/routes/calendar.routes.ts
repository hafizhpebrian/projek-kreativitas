import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { calendarService } from "../services/calendar.service.js";

const router = Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const date = (req.query.date as string) || new Date().toISOString().split("T")[0];
    const view = (req.query.view as string) || "day";
    if ((view === "week" || view === "month") && req.query.endDate) {
      res.json(await calendarService.getWeekTimeline(date, req.query.endDate as string));
    } else {
      res.json(await calendarService.getResourceTimeline(date));
    }
  } catch (e) { next(e); }
});

export default router;
