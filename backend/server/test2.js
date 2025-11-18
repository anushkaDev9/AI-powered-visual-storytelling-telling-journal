import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import vision from "@google-cloud/vision";
import cors from "cors";

const router = express.Router();
const { GOOGLE_API_KEY, GOOGLE_PROJECT_ID, GOOGLE_APPLICATION_CREDENTIALS } = process.env;

// Allow frontend
router.use(cors({ origin: "http://localhost:3001" }));

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Vision client
const visionClient = new vision.ImageAnnotatorClient({
  projectId: GOOGLE_PROJECT_ID,
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
});

// Multer memory upload
const upload = multer({ storage: multer.memoryStorage() });

// ----------------------------
// POST /generate-narrative
// ----------------------------
router.post("/generate-narrative", upload.single("image"), async (req, res) => {
  try {
    const { lineCount, perspective, tone } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("\n=== FRONTEND DATA ===");
    console.log({ lineCount, perspective, tone });

    // 🔍 Vision AI Analysis
    const [visionResult] = await visionClient.batchAnnotateImages({
      requests: [
        {
          image: { content: imageFile.buffer },
          features: [
            { type: "LABEL_DETECTION" },
            { type: "OBJECT_LOCALIZATION" },
          ],
        },
      ],
    });

    const annotations = visionResult.responses[0];
    const labels = (annotations.labelAnnotations || []).map(l => l.description);
    const objects = (annotations.localizedObjectAnnotations || []).map(o => o.name);

    const description = `Labels: ${labels.join(", ")}. Objects: ${objects.join(", ")}.`;
    console.log("\n=== VISION OUTPUT ===");
    console.log(description);

    // ✍ Build narrative prompt
    const narrativePrompt = `
Write a story using a **${tone}** tone and **${perspective}** perspective.
Make it exactly **${lineCount} lines**.

Image description:
${description}

Rules:
- Do not exceed ${lineCount} lines.
- Each line must be a complete sentence.
    `;

    console.log("\n=== PROMPT SENT TO GEMINI ===");
    console.log(narrativePrompt);

    // 🤖 Gemini Generation — Correct Usage
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // ✅ working model
    });

    const result = await model.generateContent([
      { text: narrativePrompt },
      {
        inlineData: {
          data: imageFile.buffer,       // raw buffer from multer
          mimeType: imageFile.mimetype
        }
      }
    ]);

    const text = await result.response.text();

    console.log("\n=== STORY GENERATED ===");
    console.log(text);

    // Convert image to base64 for frontend
    const base64 = imageFile.buffer.toString("base64");

    res.json({
      narrative: text,
      imageUrl: `data:${imageFile.mimetype};base64,${base64}`,
      lineCount,
      perspective,
      tone
    });

  } catch (err) {
    console.error("❌ Generate Narrative Error:", err);
    res.status(500).json({ error: "Generation failed", details: err.message });
  }
});

export default router;
