import React, { useState, useEffect, useRef } from 'react';
import Page from '../Page';
import { AiOutlineCloudUpload } from "react-icons/ai";
import placeholderImage from '../../Images/book_image.PNG';

const CreateEntry = ({ setView }) => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // ⭐ NEW: story line count instead of prompt
  const [lineCount, setLineCount] = useState(10);

  const [selectedPerspective, setSelectedPerspective] = useState("first");
  const [selectedTone, setSelectedTone] = useState("formal");

  const fileInputRef = useRef(null);
  const API_BASE = "http://localhost:3000";

  // Load saved preview
  useEffect(() => {
    const savedPhoto = localStorage.getItem("pickedPhotoUrl");
    if (savedPhoto) setSelectedPhotoUrl(savedPhoto);
  }, []);

  // Import from device
  const handleDeviceImport = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setSelectedPhotoUrl(URL.createObjectURL(file));
  };

  // ⭐ Send to backend
  const sendToBackend = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("perspective", selectedPerspective);
    formData.append("tone", selectedTone);

    // ⭐ Send lineCount as "lineCount"
    formData.append("lineCount", lineCount);

    console.log("Sending FormData:", {
      image: selectedFile,
      perspective: selectedPerspective,
      tone: selectedTone,
      lineCount,
    });

    try {
      const response = await fetch(`${API_BASE}/ai/generate-narrative`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Backend responded:", data);

      localStorage.setItem("AI_NARRATIVE", data.narrative);
      alert("Narrative generated!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send request.");
    }
  };

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
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
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
              <button
                className="rounded-full bg-amber-400 text-slate-900 px-4 py-2 font-semibold"
                onClick={handleDeviceImport}
              >
                Import from device
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200"
                onClick={() =>
                  window.location.assign(
                    `${API_BASE}/photos/auth?next=${encodeURIComponent("/?view=photosPicker")}`
                  )
                }
              >
                Import from Google Photos
              </button>

              <button className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-slate-200">
                Import from Pinterest
              </button>
            </div>

            <img
              src={selectedPhotoUrl || placeholderImage}
              alt="Selected"
              className="w-full object-cover mt-4 rounded-xl"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-2xl ring-1 ring-slate-800 bg-slate-900/60 p-6">
          {/* Perspective */}
          <p className="text-sm text-slate-300 mb-2">Choose Perspective</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {styles.slice(0, 2).map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPerspective(p.id)}
                className={`rounded-xl px-4 py-3 text-left border transition ${
                  selectedPerspective === p.id
                    ? "bg-amber-400 text-slate-900 border-amber-300"
                    : "bg-slate-900/40 border-slate-700 text-slate-200 hover:border-slate-600"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Tone */}
          <p className="text-sm text-slate-300 mb-2">Choose Tone</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {styles.slice(2).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTone(t.id)}
                className={`rounded-xl px-4 py-3 text-left border transition ${
                  selectedTone === t.id
                    ? "bg-amber-400 text-slate-900 border-amber-300"
                    : "bg-slate-900/40 border-slate-700 text-slate-200 hover:border-slate-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ⭐ NEW — Line Count Input */}
          <div className="mt-8">
            <p className="text-sm text-slate-300 mb-2">How many lines should the story be?</p>

            <input
              type="number"
              min="1"
              max="50"
              value={lineCount}
              onChange={(e) => setLineCount(e.target.value)}
              className="w-full rounded-xl bg-slate-950 text-slate-100 border border-slate-800 p-3 outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={sendToBackend}
              className="rounded-full bg-amber-400 text-slate-900 px-5 py-2 font-semibold"
            >
              Generate Narrative
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CreateEntry;
