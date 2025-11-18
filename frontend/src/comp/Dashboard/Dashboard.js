import React from 'react'
import Page from '../Page';
import { IoBook } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { TbPencilStar } from "react-icons/tb";
const Dashboard = ({ setView }) => {
 
  const cards = [
    { title: "New Story",icon:<IoBook />, desc: "Write a new journal entry with AI.", cta: "Start Now", onClick: () => setView("create") },
    { title: "Media Library",icon:<GrGallery />, desc: "Browse your imported photos.", cta: "View Library", onClick: () => alert("Library coming soon") },
    { title: "Narrative Rebuilder",icon:<TbPencilStar />, desc: "Refine or recreate past stories with insights.", cta: "Explore Insights", onClick: () => setView("compose") },
  ];
  return (
    <Page title="dashboard">
      <div className="grid md:grid-cols-3 gap-6">
  {cards.map((c) => (
    <div
      key={c.title}
      className="rounded-2xl border border-slate-800 p-6 bg-slate-900/60"
    >
      {/* icon + title row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 rounded-xl bg-amber-400/15 border border-amber-300/30 grid place-items-center text-amber-200">
          {c.icon } {/* fallback icon */}
        </div>
        <h3 className="text-xl font-semibold text-slate-100">{c.title}</h3>
      </div>

      {/* description + button below */}
      <p className="text-slate-400 text-sm min-h-[48px]">{c.desc}</p>
      <button
        onClick={c.onClick}
        className="mt-5 rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold"
      >
        {c.cta}
      </button>
    </div>
  ))}
</div>

     
    </Page>
  );
}


export default Dashboard