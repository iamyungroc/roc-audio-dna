"use client";
import { useState, useRef } from 'react';

export default function RocAudioDNA() {
  const [dnaHash, setDnaHash] = useState("AWAITING_INPUT");

  const analyzeAudio = async (file: File) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Core DNA Logic: Simplified Crest Factor Extraction
    const data = audioBuffer.getChannelData(0);
    let peak = 0;
    for (let i = 0; i < data.length; i++) {
      if (Math.abs(data[i]) > peak) peak = Math.abs(data[i]);
    }
    
    setDnaHash(`SOUL_SIGNATURE: ${peak.toFixed(4)}Hz-CRITICAL`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-amber-500 p-8">
      <h1 className="text-4xl font-bold tracking-tighter mb-12">RøcAudio DNA</h1>
      
      <div className="w-64 h-64 border-2 border-amber-500/30 rounded-full flex items-center justify-center mb-8 hover:border-amber-500 transition-all">
        <p className="text-sm uppercase tracking-widest text-center">{dnaHash}</p>
      </div>

      <input 
        type="file" 
        onChange={(e) => e.target.files && analyzeAudio(e.target.files[0])}
        className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-amber-500 file:text-zinc-950 hover:file:bg-amber-400"
      />
    </main>
  );
}
