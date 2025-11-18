import express from "express";
import session from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

// Load environment variables
dotenv.config();

const {
  PORT = 3000,
  SESSION_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,                 // e.g. http://localhost:3000/google/callback
  FRONTEND_ORIGIN = "http://localhost:3001",
} = process.env;

/* ---------- APP ---------- */
const app = express();

app.use(
  cors({
    origin: [FRONTEND_ORIGIN, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  session({
    name: "sess",
    keys: [SESSION_SECRET],
    httpOnly: true,
    sameSite: "lax",     // FIXED
    secure: false,       // FIXED (required for localhost)
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
);



// If deploying behind a proxy (Cloud Run/Render/etc), you may need:
// app.set("trust proxy", 1);

/* ---------- GOOGLE OAUTH ---------- */
const oauth = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// Base scopes for sign-in only
const BASE_SCOPES = ["openid", "email", "profile"];

/* ---------- PLACEHOLDER DATABASE FUNCTIONS ---------- */
// Replace these with your actual Firestore or database logic
async function upsertUser(id, data) {
  console.log("Upserting user:", id, data);
  // Implement your database save logic here
}
async function userExistsByEmail(email) {
  console.log("Checking if user exists:", email);
  // Implement your database check here
  return false; // dummy
}

/* ---------- ROUTES ---------- */
/* Health */
app.get("/", (_req, res) => {
  res.send(`API running. <a href='/google'>Sign in with Google</a>`);
});

/* Start Google sign-in (supports ?next=/some-route) */
app.get("/google", (req, res) => {
  const state = typeof req.query.next === "string" ? req.query.next : "";
  const url = oauth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: BASE_SCOPES,
    state,
  });
  res.redirect(url);
});

/* OAuth2 callback */
app.get("/google/callback", async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error("No code returned from Google");

    // 1) Exchange code for tokens
    const { tokens } = await oauth.getToken(code);
    oauth.setCredentials(tokens);
    req.session.tokens = oauth.credentials;

    // 2) Decode id_token for profile info
    const idToken = oauth.credentials.id_token || tokens.id_token;
    if (!idToken) throw new Error("No id_token returned from Google");
    const payload = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf8"));

    // 3) Save minimal profile to session
    req.session.profile = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    // 4) Upsert user in DB
    await upsertUser(payload.sub, {
      email: payload.email ?? null,
      name: payload.name ?? null,
      picture: payload.picture ?? null,
    });

    // 5) Redirect after login
    const state = typeof req.query.state === "string" ? req.query.state : "";
    const nextUrl =
  state && state.startsWith("/")
    ? `${FRONTEND_ORIGIN}${state}`
    : `${FRONTEND_ORIGIN}?view=books`;


    res.redirect(nextUrl);
  } catch (e) {
    next(e);
  }
});

/* ---------- SIMPLE AUTH APIS ---------- */
app.get("/api/me", (req, res) => {
  res.json({ authed: !!req.session?.tokens });
});

app.get("/api/profile", (req, res) => {
  if (!req.session?.profile) return res.status(401).json({ error: "not_authed" });
  res.json(req.session.profile);
});

app.post("/api/logout", (req, res) => {
  req.session = null;
  res.json({ ok: true });
});

app.get("/api/user/exists", async (req, res, next) => {
  try {
    const email = typeof req.query.email === "string" ? req.query.email.trim() : "";
    if (!email) return res.status(400).json({ error: "missing_email" });

    const exists = await userExistsByEmail(email);
    res.json({ exists });
  } catch (e) {
    next(e);
  }
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, _req, res, _next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "server_error", detail: String(err) });
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`API at http://localhost:${PORT}`);
  console.log(`Frontend origin: ${FRONTEND_ORIGIN}`);
});
