"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Sparkles, Volume2, Mic, Activity, ArrowRight, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroShowcase() {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto pt-6 pb-2">
        {/* Main Video Frame with Rich Terracotta Border */}
        <div className="relative rounded-[26px] sm:rounded-[34px] p-1.5 sm:p-2 bg-[#C24B1B] shadow-video-card">
          <div className="relative rounded-[20px] sm:rounded-[26px] overflow-hidden bg-[#18181b] aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center">
            {/* Background realistic candidate photo scene */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80')`,
              }}
            />

            {/* Dark warm ambient overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

            {/* Live Telemetry Overlay Badges on Top */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Voice Stream Online</span>
                <span className="text-zinc-400">•</span>
                <span className="text-sky-300 font-semibold">580ms latency</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-zinc-300 text-[11px]">
                <Mic className="w-3.5 h-3.5 text-indigo-400" />
                <span>Neural Voice: Nova</span>
              </div>
            </div>

            {/* Candidate & AI Voice Bubble Preview */}
            <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 max-w-lg mx-auto p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-white z-10 space-y-1 text-center sm:text-left shadow-xl">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-indigo-300 font-semibold">
                <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>AI Interviewer Speaking:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed">
                &ldquo;I noticed from your resume that you built a real-time collaboration canvas. How do you resolve state sync when network partitions occur?&rdquo;
              </p>
            </div>

            {/* Centered Frosted-Glass Play Button */}
            <button
              type="button"
              onClick={() => setIsPlayingDemo(true)}
              className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/25 hover:bg-white/35 backdrop-blur-lg border border-white/40 text-white shadow-2xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#111815] group-hover:scale-110 transition-transform shadow-md">
                <Play className="w-4 h-4 fill-[#111815] ml-0.5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold leading-tight">Hear Live Sample</div>
                <div className="text-[10px] text-white/80 font-mono">Interactive Audio Preview</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Live Audio Sample Modal */}
      <AnimatePresence>
        {isPlayingDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#18181b] border border-zinc-700 shadow-2xl overflow-hidden text-zinc-100 flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live Voice Agent Demo</h3>
                    <p className="text-[11px] text-zinc-400">Sample Technical Probing Turn</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlayingDemo(false)}
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Visualizer wave demo */}
                <div className="h-28 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col items-center justify-center gap-3 p-4">
                  <div className="flex items-center gap-1.5 h-10">
                    {[40, 75, 95, 60, 30, 85, 100, 70, 45, 90, 65, 35, 80, 50].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 to-sky-400 animate-pulse"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 80}ms`,
                          animationDuration: "1.2s",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Voice synthesis active • Sub-600ms latency stream
                  </span>
                </div>

                {/* Dialog Turn */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200">
                    <strong className="text-indigo-400 block mb-1">Interviewer AI (Nova):</strong>
                    &ldquo;In your high-throughput payment ledger, you achieved 4,500 tx/sec with zero double spends. What was your strategy for handling database primary failovers without locking out retries?&rdquo;
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100">
                    <strong className="text-sky-400 block mb-1">Candidate (Monu):</strong>
                    &ldquo;We used a two-tier idempotency key pattern. Every request is verified via Redis SETNX with a lease before touching Postgres row-level locks, safely returning the cached transaction receipt if retried.&rdquo;
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingDemo(false)}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200"
                >
                  Close
                </button>

                <Link
                  href="/interview"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span>Launch Full Interview Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

