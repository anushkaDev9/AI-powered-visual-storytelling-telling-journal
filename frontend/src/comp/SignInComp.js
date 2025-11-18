import { useEffect, useState, useRef } from "react";

const API_BASE = "http://localhost:3000";

export default function SignInComp() {
  const [user, setUser] = useState(null); // { name, email, picture }
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Fetch profile when component mounts
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/api/profile`, {
          credentials: "include",
        });
        if (r.ok) setUser(await r.json());
      } catch {
        setUser(null);
      }
    })();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSignIn = () => {
    window.location.assign(`${API_BASE}/google`);
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setOpen(false);
  };

  // show "Sign In" if no user
  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 px-4 py-2 font-semibold shadow-md active:scale-[0.98]"
      >
        Sign In
      </button>
    );
  }

  // show avatar + dropdown if signed in
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1 text-slate-100 hover:bg-slate-700"
      >
        <img
          src={user.picture}
          alt={user.name}
          className="h-8 w-8 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="hidden sm:block font-medium">{user.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-slate-900 text-slate-100 shadow-lg border border-slate-700">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
