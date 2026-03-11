"use client";
import { useState } from "react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div 
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <a href="https://zalo.me/0938591483" target="_blank" className="flex items-center gap-3 bg-white text-zinc-900 px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-zinc-100 transition-colors">
          <span className="text-[10px] font-bold tracking-widest uppercase">Zalo</span>
        </a>
        <a href="tel:0938591483" className="flex items-center gap-3 bg-white text-zinc-900 px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-zinc-100 transition-colors">
          <span className="text-[10px] font-bold tracking-widest uppercase">Hotline</span>
        </a>
      </div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-black hover:scale-105 transition-all"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}