import { Router } from "express";
import { chatWithAI } from "../controllers/ai.controller.js";

const router = Router();

// POST /api/v1/ai/chat
router.post("/chat", chatWithAI);

export default router;

