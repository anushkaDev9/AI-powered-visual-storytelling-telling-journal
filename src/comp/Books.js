import React from 'react'
import Page from './Page'
const Books = ({setView}) => {
  return (
    <Page title="My books">
      <div className="rounded-2xl overflow-hidden ring-1 ring-slate-800 mb-8">
        
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="rounded-xl overflow-hidden ring-1 ring-slate-800">
            <img src={require('../Images/book_image.PNG')} alt="Story cover" className="w-full h-48 object-cover" />
            </div>
            <button onClick={() => setView("viewer")} className="mt-4 w-full rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold">
              View
            </button>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default Books