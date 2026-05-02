import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../auth/index.js";

const router = Router();

// Forward all /api/auth/* requests to better-auth handler
router.all("/*splat", toNodeHandler(auth));

export default router;
