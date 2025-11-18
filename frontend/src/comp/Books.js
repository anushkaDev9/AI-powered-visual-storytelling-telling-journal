// src/comp/Books.jsx
import React from "react";
import Page from "./Page";

const API_BASE = "http://localhost:3000";

export default function Books({ setView, profile }) {
  // profile === undefined -> App still checking auth
  if (profile === undefined) {
    return (
      <Page title="My books">
        <div className="h-40 grid place-items-center text-slate-400 animate-pulse">
          Checking session…
        </div>
      </Page>
    );
  }

  // profile === null -> not authed
  if (profile === null) {
    const goLogin = () => {
      window.location.assign(`${API_BASE}/google?next=${encodeURIComponent("/?view=books")}`);
    };

    return (
      <Page title="Your Library">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-400/15 border border-amber-300/30 grid place-items-center text-amber-200 mb-4">
            {/* tiny book glyph */}
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M5 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h13v-2H6a1 1 0 0 1-1-1V6h13V4H5z" />
              <path d="M8 7h8v2H8zM8 11h6v2H8z" className="opacity-70" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold">Sign in to see your books</h2>
          <p className="mt-2 text-slate-400">
            Your stories, covers, and drafts live in your account. Log in to continue where you left off.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={goLogin}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 text-slate-900 px-5 py-3 font-semibold shadow hover:brightness-95"
            >
              Continue with Google
            </button>

            <button
              onClick={() => setView("home")}
              className="rounded-full border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:bg-slate-800"
            >
              Explore first
            </button>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Tip: Once signed in, your book covers will appear here automatically.
          </div>
        </div>
      </Page>
    );
  }

  // profile exists -> signed in
  return (
    <Page title="My books">
      <div className="rounded-2xl overflow-hidden ring-1 ring-slate-800 mb-8 p-4 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-3">
          <img
            src={profile.picture}
            alt={profile.name || profile.email}
            className="h-9 w-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm font-semibold">{profile.name || "Signed in"}</p>
            <p className="text-xs text-slate-400">{profile.email}</p>
          </div>
        </div>
        <button
          onClick={() => setView("create")}
          className="rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold"
        >
          New book
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="rounded-xl overflow-hidden ring-1 ring-slate-800">
              <img
                src={require("../Images/book_image.PNG")}
                alt="Story cover"
                className="w-full h-48 object-cover"
              />
            </div>
            <button
              onClick={() => setView("viewer")}
              className="mt-4 w-full rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </Page>
  );
}
