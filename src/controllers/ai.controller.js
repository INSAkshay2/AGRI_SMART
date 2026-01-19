import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const buildAgricultureAssistantPrompt = (userPrompt) => {
  return `
You are CropDoctor, an agricultural assistant for farmers.

Goals:
- Explain crop diseases and solutions in simple, farmer-friendly language.
- Keep responses concise and actionable (use short bullet points when helpful).
- If the prompt is unclear, ask 1-2 clarifying questions.
- Do NOT mention you are an AI model. Do NOT include legal/medical disclaimers.

User prompt:
${userPrompt}
`.trim();
};

export const chatWithAI = asyncHandler(async (req, res) => {
  const { prompt } = req.body || {};

  if (typeof prompt !== "string") {
    throw new ApiError(400, "prompt must be a string");
  }

  const trimmed = prompt.trim();
  if (!trimmed) {
    throw new ApiError(400, "prompt is required");
  }

  if (trimmed.length > 2000) {
    throw new ApiError(400, "prompt is too long (max 2000 characters)");
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ApiError(500, "GEMINI_API_KEY is not set on the server");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const finalPrompt = buildAgricultureAssistantPrompt(trimmed);
  const result = await model.generateContent(finalPrompt);

  const reply = result?.response?.text?.() ? result.response.text().trim() : "";
  if (!reply) {
    throw new ApiError(502, "AI service returned an empty response");
  }

  return res.status(200).json(new ApiResponse(200, { reply }, "OK"));
});

