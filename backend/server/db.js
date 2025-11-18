// db.js
import { Firestore } from "@google-cloud/firestore";

const projectId =
  process.env.FIRESTORE_PROJECT_ID ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT;

if (!projectId) {
  throw new Error("No projectId resolved. Set FIRESTORE_PROJECT_ID in .env");
}

export const db = new Firestore({ projectId });

export async function upsertUser(sub, data) {
  await db.collection("users").doc(sub).set(
    {
      ...data,
      provider: "google",
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    },
    { merge: true }
  );
}

// ✅ NEW: implement the function you import in server.js
export async function userExistsByEmail(email) {
  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  return !snap.empty;
}
