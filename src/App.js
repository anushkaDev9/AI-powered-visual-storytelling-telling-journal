import logo from './logo.svg';
import './App.css';
import Header from './comp/Header';
import Hero from './comp/Home.js/Hero';
import Works from './comp/Home.js/Works';
import Dashboard from './comp/Dashboard/Dashboard';
import { useState } from 'react';
import CreateEntry from './comp/Dashboard/CreateEntry';
import Compose from './comp/Dashboard/Compose';
import Books from './comp/Books';
import Viewer from './comp/Viewer';
import SignInPage from './comp/SignInButton';
function App() {
   const [view, setView] = useState("home");
  return (
    <div className="App">
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <Header view={view} setView={setView} />
      <div>
        {view === "home" && (
          <div key="home">
            <Hero setView={setView} />
            <Works />
           
          </div>
        )}
       {view === "dashboard" && (
          <div key="dashboard">
            <Dashboard setView={setView} />
          </div>
        )} 
        {view === "create" && (
          <div key="create">
            <CreateEntry setView={setView} />
          </div>
        )}
        {view === "compose" && (
          <div key="compose">
            <Compose setView={setView} />
          </div>
        )}
        {view === "books" && (
          <div key="books">
            <Books setView={setView} />
          </div>
        )}
        {view === "viewer" && (
          <div key="viewer">
            <Viewer setView={setView} />
          </div>
        )}
        {view==='SignInButton' && (
          <SignInPage setView={setView}/>
        )}
      </div>
      <footer className="mt-10 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400">© {new Date().getFullYear()} AIVision Journal · Demo UI</div>
      </footer>
    </div>
     
    </div>
  );
}

export default App;
