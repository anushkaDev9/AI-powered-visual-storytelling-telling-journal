import React from 'react'
import Page from '../Page';
import { useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
const CreateEntry = ({ setView }) => {
    const [style, setStyle] = useState("first");
  const styles = [
    { id: "first", label: "First-Person (I Perspective)" },
    { id: "third", label: "Third-Person (Story Mode)" },
    { id: "formal", label: "Formal / Descriptive" },
    { id: "poetic", label: "Creative / Poetic" },
  ];
  return (
    <Page title="Create Entry">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-slate-100">Create a new Entry</h2>
        <button onClick={() => setView("dashboard")} className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-200">
         {/*<ArrowLeft className="h-4 w-4" /> Back to Dashboard */}
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl ring-1 ring-slate-800 overflow-hidden bg-slate-900/60 p-6">
          <div className="mx-auto max-w-md">
            <div className="h-14 w-14 rounded-xl bg-amber-400/15 border border-amber-300/30 grid place-items-center text-amber-200 mb-4">
                <AiOutlineCloudUpload />
            </div>
            <h3 className="text-xl font-semibold">Upload Photo / Reference Photo</h3>
            <p className="text-slate-400 mt-2 text-sm">
              Drag & drop images here or import. Vision AI will analyze objects, scenes, and text.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-full bg-amber-400 text-slate-900 px-4 py-2 font-semibold">Import from device</button>
              <button className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200">Import from google photos</button>
              <button className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200">Import from pinterest</button>
            </div>
            <div className="mt-6 rounded-xl overflow-hidden ring-1 ring-slate-800">
              <img src={require('../../Images/book_image.PNG')} alt="Upload" className="w-full" /> 
            </div>
          </div>
        </div>
        <div className="rounded-2xl ring-1 ring-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-300 mb-4">Choose a style</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`rounded-xl px-4 py-3 text-left border transition ${
                  style === s.id
                    ? "bg-amber-400 text-slate-900 border-amber-300"
                    : "bg-slate-900/40 border-slate-700 text-slate-200 hover:border-slate-600"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <textarea
              placeholder="Enter prompt"
              className="w-full min-h-[160px] rounded-xl bg-slate-950 text-slate-100 border border-slate-800 p-4 outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setView("compose")} className="rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold">
              Generate Narrative
            </button>
            <button className="rounded-full bg-slate-800 text-slate-200 px-5 py-2 font-semibold">Save Entry</button>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default CreateEntry