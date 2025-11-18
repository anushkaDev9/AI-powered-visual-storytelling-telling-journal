import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const client = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
});

async function testKey() {
  try {
    const response = await client.generateContent({
      model: "text-bison-001",
      prompt: "Hello, test if this API key works"
    });
    console.log("✅ Key works!");
    console.log(response.output[0].content[0].text);
  } catch (err) {
    console.error("❌ Key invalid or misconfigured:", err.message);
  }
}

testKey();
// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "cookie-session";
import { OAuth2Client } from "google-auth-library";
import aiRoutes from "./routes/ai.js";
import { db, upsertUser, userExistsByEmail } from "./db.js";
// --------------------
// 1. Initialize Express
// --------------------
const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// 2. Middleware
// --------------------

// Allow frontend to connect
app.use(
  cors({
    origin: "http://localhost:3001", // <-- your React frontend port
    credentials: true,
  })
);

// Parse JSON bodies for non-file routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie-session setup (for Google OAuth, Google Photos, etc.)
app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET || "supersecret"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);

// --------------------
// 3. Google OAuth Client Setup (only if you use it)
// --------------------
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Make the client available throughout app
app.set("googleClient", googleClient);

// --------------------
// 4. AI Routes (your Gemini Vision + Story Generation)
// --------------------
app.use("/ai", aiRoutes);

// --------------------
// 5. Simple Test Route
// --------------------
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// --------------------
// 6. Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
