import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

export default function PhotosPicker({ setView }) {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/api/photos/recent`, { credentials: "include" });
        if (r.status === 401 || r.status === 403) {
          // not authed or missing scope → kick off incremental auth
          window.location.assign(`${API_BASE}/photos/auth?next=${encodeURIComponent("/?view=photosPicker")}`);
          return;
        }
        if (!r.ok) throw new Error("Failed to load Google Photos");
        const data = await r.json();
        setItems(data.items || []);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  const choose = (baseUrl) => {
    localStorage.setItem("pickedPhotoUrl", baseUrl);
    setView("create"); // go back to CreateEntry
  };

  if (status === "loading") return shell(<div className="text-slate-300">Loading photos…</div>);
  if (status === "error") return shell(<div className="text-rose-300">Couldn’t load photos. Try again.</div>);

  return shell(
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Pick a photo</h1>
        <button onClick={() => setView("create")} className="text-slate-300 hover:text-amber-200 text-sm">Back</button>
      </div>
      {items.length === 0 ? (
        <div className="text-slate-400">No photos found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map(m => (
            <button
              key={m.id}
              onClick={() => choose(m.baseUrl)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-700 hover:border-amber-300"
              title={m.filename}
            >
              <img
                src={`${m.baseUrl}=w400-h400`}
                alt={m.filename}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function shell(children) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto p-6">{children}</div>
    </div>
  );
}
