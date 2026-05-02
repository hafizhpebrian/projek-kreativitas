import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { userService } from "../services/user.service.js";

const router = Router();

router.get("/me", requireAuth, async (req, res, next) => {
  try { res.json(await userService.getProfile(req.user!.id)); } catch (e) { next(e); }
});

router.patch("/me", requireAuth, async (req, res, next) => {
  try { res.json(await userService.updateProfile(req.user!.id, req.body)); } catch (e) { next(e); }
});

router.patch("/me/preferences", requireAuth, async (req, res, next) => {
  try { res.json(await userService.updatePreferences(req.user!.id, req.body)); } catch (e) { next(e); }
});

export default router;
