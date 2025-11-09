import React from 'react'
import Page from '../Page';
const Hero = ({ view, setView }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_30%_-10%,rgba(245,197,24,0.12),transparent_60%),radial-gradient(800px_400px_at_90%_-20%,rgba(56,189,248,0.08),transparent_60%)]" />
      <Page title="Hero">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-amber-300">
              Turn your photos into
              <br />
              <span className="text-amber-200">AI-powered Stories</span>
              <br /> or journal
            </h1>
            <p className="mt-6 text-slate-300 max-w-xl">
              Import your memories and let AI craft them into visual narratives.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setView("dashboard")}
                className="rounded-full bg-amber-400 text-slate-900 px-6 py-3 font-semibold shadow"
              >
                Get Started
              </button>
              <button
                onClick={() => setView("books")}
                className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200"
              >
                View Storybooks
              </button>
            </div>
          </div>
          <div className="relative rounded-3xl ring-1 ring-slate-800 overflow-hidden shadow-2xl">
            <img src={require('../../Images/home1.PNG')} alt="Hero" className="w-full" />
          </div>
        </div>
      </Page>
    </div>
  );
}

export default Hero