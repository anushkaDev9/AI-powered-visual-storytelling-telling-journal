import React from 'react'
import Page from '../Page';
import { GrGallery } from "react-icons/gr";
import { FiPenTool } from "react-icons/fi";
import { PiStarFourDuotone } from "react-icons/pi";
import { IoBook } from "react-icons/io5";
const Works = () => {
    const steps = [
    { title: "Import photos", icon:<GrGallery />  ,desc: "Connect Google Photos or Pinterest via secure OAuth." },
    { title: "AI Vision Analysis",icon:<FiPenTool />, desc: "Detect scenes, objects, and emotions from photos." },
    { title: "Gemini Story Generation",icon:<PiStarFourDuotone />, desc: "Transform insights into creative stories or journal entries." },
    { title: "Save & Revisit",icon:<IoBook />, desc: "Your storybooks are saved and ready to share anytime." },
  ];
  return (
  
    <Page title="How it works">
     <h2 className="text-4xl font-semibold text-amber-300 text-center mb-10">
  How It Works
</h2>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
  {steps.map((s) => (
    <div
      key={s.title}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
    >
      {/* icon + title side-by-side */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 rounded-xl bg-amber-400/15 border border-amber-300/30 grid place-items-center text-amber-200">
          {s.icon}
        </div>
        <h3 className="font-semibold text-lg text-slate-100">{s.title}</h3>
      </div>

      {/* description below */}
      <p className="text-slate-400 text-sm">{s.desc}</p>
    </div>
  ))}
</div>

     
    </Page>
  );
}


export default Works