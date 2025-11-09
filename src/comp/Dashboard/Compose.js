import React from 'react'
import Page from '../Page';
import { useState } from 'react';
const Compose = ({setView}) => {
     const [text, setText] = useState(
    "I ran across the park, feeling the grass tickle my feet and the wind rush past my face. My orange airplane soared above me, just like the dreams I imagined taking off into the sky. For a moment, I felt unstoppable—free, happy, and ready to fly anywhere my heart wanted to go."
  );
  const styles = ["First-Person (I Perspective)", "Third-Person (Story Mode)", "Formal / Descriptive", "Creative / Poetic"];
  return (
    <Page title="Compose">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-slate-100">Create a new Story Entry</h2>
        <button onClick={() => setView("dashboard")} className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-200">
         {/*} <ArrowLeft className="h-4 w-4" /> Back to Dashboard*/}
        </button>
      </div>
      <div className="rounded-2xl ring-1 ring-slate-800 bg-slate-900/60 p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[220px] rounded-xl bg-slate-950 text-slate-100 border border-slate-800 p-4 outline-none focus:ring-2 focus:ring-amber-400/40"
        />
        <div className="mt-4 grid sm:grid-cols-4 gap-3">
          {styles.map((s) => (
            <button key={s} className="rounded-xl bg-slate-800 text-slate-200 px-4 py-2 border border-slate-700 hover:border-slate-600">
              {s}
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => alert("Narrative regenerated!")} className="rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold">
            Generate Narrative
          </button>
          <button onClick={() => setView("books")} className="rounded-full bg-slate-800 text-slate-200 px-5 py-2 font-semibold">
            Save Entry
          </button>
        </div>
      </div>
      <div className="mt-6 rounded-2xl overflow-hidden ring-1 ring-slate-800">
        {/*<img src={IMAGES.compose} alt="Compose screenshot" className="w-full" />*/}
      </div>
    </Page>
  );
}


export default Compose