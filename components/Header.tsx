"use client";

import React, { useState, useEffect } from "react";
import { Radio, Zap, PhoneOff, Sparkles, Activity, ShieldAlert, Cpu } from "lucide-react";
import { AppScreen } from "../types/interview";

interface HeaderProps {
  screen: AppScreen;
  targetRole: string;
  roundType: string;
  durationSeconds: number;
  onEndSession: () => void;
  onOpenSettings?: () => void;
}

export function Header({
  screen,
  targetRole,
  roundType,
  durationSeconds,
  onEndSession,
  onOpenSettings,
}: HeaderProps) {
  const [latency, setLatency] = useState(640);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);

  // Dynamic realistic micro-jitter on latency
  useEffect(() => {
    if (screen !== "live") return;
    const interval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 45) - 20;
      setLatency(Math.max(540, Math.min(720, 640 + jitter)));
    }, 2800);
    return () => clearInterval(interval);
  }, [screen]);

  // Format seconds to HH:MM:SS or MM:SS
  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#27272a] bg-[#09090b]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand + Live recording pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#121215] rounded-[11px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white font-mono">
                    Mock<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Pulse</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    VOICE v2.4
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 hidden sm:inline">AI Voice Interview Agent</span>
              </div>
            </div>

            {/* Live Pulsing Recording Pill (only during live) */}
            {screen === "live" && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono font-medium shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>{formatTimer(durationSeconds)}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-400">Live</span>
              </div>
            )}
          </div>

          {/* Center: Target Role Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181b]/80 border border-[#27272a] shadow-inner text-xs">
            <span className="text-zinc-400">Role:</span>
            <span className="font-semibold text-zinc-100">{targetRole}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-indigo-400 font-medium">{roundType}</span>
          </div>

          {/* Right: Latency Monitor Badge + End Session CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {screen === "live" && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#18181b] border border-[#27272a] text-xs font-mono">
                <div className="flex items-center gap-1 text-sky-400">
                  <Zap className="w-3.5 h-3.5 fill-sky-400" />
                  <span className="font-medium">{latency}ms</span>
                </div>
                <span className="hidden lg:inline text-zinc-500">latency</span>
                <span className="hidden xl:flex items-center gap-1 text-[11px] text-emerald-400 border-l border-zinc-800 pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Ultra-low jitter
                </span>
              </div>
            )}

            {screen === "live" && (
              <button
                type="button"
                onClick={() => setShowConfirmEnd(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-950/20 text-red-300 hover:bg-red-900/40 hover:border-red-500/70 hover:text-red-100 transition-all text-xs font-medium active:scale-95 shadow-sm"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>End Session</span>
              </button>
            )}

            {screen !== "live" && onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-md border border-zinc-800 bg-[#18181b] transition-colors"
              >
                Preferences
              </button>
            )}
          </div>
        </div>
      </header>

      {/* End Session Confirmation Modal */}
      {showConfirmEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#18181b] border border-[#27272a] shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-zinc-100">End Mock Interview Session?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ending this session will finalize your performance diagnostics, compile communication telemetry, and generate your comprehensive MockPulse score card.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel & Continue Interview
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmEnd(false);
                  onEndSession();
                }}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all active:scale-95"
              >
                End & View Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

