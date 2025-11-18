import React, { useState } from "react";
import Page from "../comp/Page";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

 const handleOAuth = (provider) => {
  if (provider === "google") {
    window.location.href = "/google"; // <-- redirect to backend
  }
  // add others later, e.g. pinterest
};

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email login: ${email}`);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 ">
      <Page title="SignInButton">
        <div
          role="dialog"
          aria-labelledby="signin-title"
          aria-describedby="signin-subtitle"
          className="w-full max-w-2xl min-h-[650px] rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-slate-800 py-0 px-10 flex flex-col justify-center"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h1
              id="signin-title"
              className="text-3xl font-bold text-amber-300 leading-tight"
            >
              Sign In
            </h1>
            <p
              id="signin-subtitle"
              className="mt-1 text-base text-slate-400"
            >
              Continue to your AI Vision Journal
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="grid gap-4 max-w-md mx-auto w-full">
            <button
              onClick={() => window.location.assign("http://localhost:3000/google")}
              aria-label="Continue with Google"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            >
              <span className="grid h-6 w-6 place-items-center rounded">
                {GoogleIcon}
              </span>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuth("pinterest")}
              aria-label="Continue with Pinterest"
              className="flex items-center justify-center gap-2 rounded-xl border border-rose-400/40 bg-rose-950/40 px-5 py-3 text-sm font-semibold shadow hover:bg-rose-900/60 focus:outline-none focus:ring-2 focus:ring-rose-500/60"
            >
              <span className="grid h-6 w-6 place-items-center rounded">
                {PinterestIcon}
              </span>
              <span>Continue with Pinterest</span>
            </button>
          </div>

          {/* Divider */}
          

        
        </div>
      </Page>
    </div>
  );
}

/* ---------- Icons (inline SVGs) ---------- */
const GoogleIcon = (
  <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 31.7 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.4 2.8l5.7-5.7C33.7 6.5 29.1 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.5-.2-3-.4-4.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16.2 19 13 24 13c2.8 0 5.4 1 7.4 2.8l5.7-5.7C33.7 6.5 29.1 5 24 5c-7.4 0-13.7 4.1-17.1 9.7z" />
    <path fill="#4CAF50" d="M24 45c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.6 2.2-7.1 2.2-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C10.3 40.9 16.6 45 24 45z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3.1 5.1-6.1 6.4l6.1 5C38.1 36.9 40 31.3 40 25c0-1.5-.2-3-.4-4.5z" />
  </svg>
);

const PinterestIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#E60023" />
    <path
      d="M12.1 6.5c-3 0-4.6 2-4.6 4 0 1 .4 1.9 1.5 2.2.2 0 .4 0 .5-.2.1-.2.4-1.4.4-1.6 0-.2-.1-.3-.2-.5-.3-.4-.4-1 .1-1.6.6-.7 1.6-.8 2.3-.8 2 0 3.1 1.2 3.1 2.8 0 2.1-.9 3.9-2.3 3.9-.8 0-1.4-.7-1.2-1.5.2-.9.5-1.8.5-2.4 0-.6-.3-1.1-1-1.1-.8 0-1.4.8-1.4 1.9 0 .7.3 1.1.3 1.1s-1 4.3-1.2 5.1c-.4 1.7-.1 3.8 0 4 .1.1.2.1.3 0 .1-.2 1.6-2.1 2-3.7.1-.5.8-3 .8-3 .4.7 1.3 1.1 2.2 1.1 2.9 0 4.8-2.5 4.8-5.8 0-2.5-2.1-4.9-5.2-4.9z"
      fill="#fff"
    />
  </svg>
);
