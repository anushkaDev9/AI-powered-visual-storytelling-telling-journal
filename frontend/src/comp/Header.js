// src/comp/Header.jsx
import React from 'react';
import { GiSpellBook } from "react-icons/gi";

const API_BASE = "http://localhost:3000";

const Header = ({ view, setView, profile, setProfile }) => {
  const goLogin = () => {
    window.location.assign(
      `${API_BASE}/google?next=${encodeURIComponent("/?view=books")}`
    );
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // ignore network error, still clear local state
    }
    // clear profile locally so UI updates immediately
    setProfile(null);
    setView("home");
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-slate-100">

        {/* Logo + Name */}
        <div onClick={() => setView("home")} className="flex items-center gap-3 cursor-pointer">
          <div className="h-9 w-9 rounded-xl bg-amber-400/15 border border-amber-300/30 grid place-items-center">
            <GiSpellBook />
          </div>
          <span className="font-semibold text-lg">AIVision Journal</span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-7">
          <button
            className={`text-sm ${view === "home" ? "text-amber-300" : "text-slate-300 hover:text-amber-200"}`}
            onClick={() => setView("home")}
          >
            Home
          </button>

          <button
            className={`text-sm ${view === "dashboard" ? "text-amber-300" : "text-slate-300 hover:text-amber-200"}`}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`text-sm ${view === "books" ? "text-amber-300" : "text-slate-300 hover:text-amber-200"}`}
            onClick={() => setView("books")}
          >
            My books
          </button>
        </nav>

        {/* RIGHT SIDE — Sign In OR Profile + Logout */}
        <div>
          {profile ? (
            <div className="flex items-center gap-4">
              <img
                src={profile.picture}
                alt="profile"
                referrerPolicy="no-referrer"
                onClick={() => setView("books")}
                className="h-10 w-10 rounded-full cursor-pointer border border-slate-700 hover:scale-105 transition"
              />
              <button
                onClick={logout}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-amber-200 hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 px-4 py-2 font-semibold shadow-md active:scale-[0.98]"
              onClick={goLogin}
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
