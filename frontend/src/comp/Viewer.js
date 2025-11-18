import React from 'react'
import Page from './Page';
const Viewer = ({setView}) => {
 const styleBtns = ["First-Person (I Perspective)", "Third-Person (Story Mode)", "Creative / Poetic", "Formal / Descriptive"];
  const text =
    "I ran across the park, feeling the grass tickle my feet and the wind rush past my face. My orange airplane soared above me, just like the dreams I imagined taking off into the sky. For a moment, I felt unstoppable—free, happy, and ready to fly anywhere my heart wanted to go.";
  return (
    <Page title="Viewer">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-slate-100">Storybook</h2>
        <button onClick={() => setView("books")} className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-200">
          Back to My books
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden ring-1 ring-slate-800">
          <img src={require('../Images/book_image.PNG')} alt="Viewer" className="w-full" />
        </div>
        <div className="rounded-2xl ring-1 ring-slate-800 bg-slate-900/60 p-6 flex flex-col">
          <p className="text-slate-200 leading-relaxed">{text}</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {styleBtns.map((b) => (
              <button key={b} className="rounded-xl bg-slate-800 text-slate-200 px-4 py-2 border border-slate-700 hover:border-slate-600 text-sm">
                {b}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <button onClick={() => alert("Regenerated!")} className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold">
               regenerate
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-800 text-slate-200 px-5 py-2 font-semibold">
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-800 text-slate-200 px-5 py-2 font-semibold">
                  Share
            </button>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Viewer