// src/App.js
import "./App.css";
import Header from "./comp/Header";
import Hero from "./comp/Home.js/Hero";
import Works from "./comp/Home.js/Works";
import Dashboard from "./comp/Dashboard/Dashboard";
import { useEffect, useMemo, useState } from "react";
import CreateEntry from "./comp/Dashboard/CreateEntry";
import Compose from "./comp/Dashboard/Compose";
import Books from "./comp/Books";
import Viewer from "./comp/Viewer";
import SignInPage from "./comp/SignInButton";
import PhotosPicker from "./comp/PhotosPicker";

const API_BASE = "http://localhost:3000";

export default function App() {
  // read initial view from URL (?view=...), fallback to "home"
  const initialView = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    // preserve existing behavior
    return params.get("view") || "home";
  }, []);

  const [view, setView] = useState(initialView);

  // AUTH: profile state lives here
  // undefined = checking, null = not authed, object = authed
  const [profile, setProfile] = useState(undefined);

  // keep URL in sync when view changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.replaceState({}, "", url.toString());
  }, [view]);

  // Check session/profile once on app mount
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/api/profile`, {
          credentials: "include",
        });
        if (r.ok) {
          const p = await r.json();
          setProfile(p);
        } else {
          setProfile(null);
        }
      } catch (e) {
        // network error -> treat as not authed
        setProfile(null);
      }
    })();
  }, []);

  return (
    <div className="App">
      <div className="min-h-screen w-full bg-slate-950 text-slate-50">
        {/* Pass profile and setProfile to Header */}
        <Header view={view} setView={setView} profile={profile} setProfile={setProfile} />

        <div>
          {view === "home" && (
            <div key="home">
              <Hero setView={setView} />
              <Works />
            </div>
          )}

          {view === "dashboard" && (
            <div key="dashboard">
              <Dashboard setView={setView} />
            </div>
          )}

          {view === "create" && (
            <div key="create">
              <CreateEntry setView={setView} />
            </div>
          )}

          {view === "compose" && (
            <div key="compose">
              <Compose setView={setView} />
            </div>
          )}

          {view === "books" && (
            <div key="books">
              <Books setView={setView} profile={profile} setProfile={setProfile} />
            </div>
          )}

          {view === "viewer" && (
            <div key="viewer">
              <Viewer setView={setView} />
            </div>
          )}

          {view === "SignInButton" && <SignInPage setView={setView} />}

          {/* Google Photos picker view */}
          {view === "photosPicker" && <PhotosPicker setView={setView} />}
        </div>

        <footer className="mt-10 border-t border-slate-800">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400">
            © {new Date().getFullYear()} AIVision Journal · Demo UI
          </div>
        </footer>
      </div>
    </div>
  );
}
