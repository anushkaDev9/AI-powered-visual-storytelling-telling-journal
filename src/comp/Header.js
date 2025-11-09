import React from 'react'
import { GiSpellBook } from "react-icons/gi";
const Header = ({ view, setView }) => {
 
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-slate-100">
        <div onClick={() => setView("home")} className="flex items-center gap-3 cursor-pointer">
          <div className="h-9 w-9 rounded-xl bg-amber-400/15 border border-amber-300/30 grid place-items-center">
          <GiSpellBook/>
          </div>
          <span className="font-semibold text-lg">AIVision Journal</span>
        </div>
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
        <button className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 px-4 py-2 font-semibold shadow-md active:scale-[0.98]" 
        onClick={() => setView("SignInButton")}>
          Sign In
        </button>
      </div>
    </header>
  );
}
export default Header