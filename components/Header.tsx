"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, PhoneOff, Activity, ShieldAlert, Sliders } from "lucide-react";
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
      <header className="sticky top-0 z-40 w-full border-b border-[#E5E0D0] bg-[#FAF8EE]/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Left: Brand + Live recording pill */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#FEF08A] border-2 border-[#111815] flex items-center justify-center text-[#111815] font-black text-lg group-hover:scale-105 transition-transform shadow-xs">
                M
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-[#111815]">
                    MockPulse
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#FEF08A] text-[#713F12] border border-[#FDE047] font-mono">
                    VOICE v2.4
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium hidden sm:inline">
                  Engineered by Monu Shah (@monushah108)
                </span>
              </div>
            </Link>

            {/* Live Pulsing Recording Pill (only during live) */}
            {screen === "live" && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#C24B1B] text-white text-xs font-mono font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>{formatTimer(durationSeconds)}</span>
                <span className="text-[9px] uppercase font-black tracking-wider text-yellow-200">
                  Live
                </span>
              </div>
            )}
          </div>

          {/* Center: Target Role Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E0D0] shadow-xs text-xs">
            <span className="text-zinc-500 font-medium">Role:</span>
            <span className="font-bold text-[#111815]">{targetRole}</span>
            <span className="text-zinc-300">•</span>
            <span className="text-[#C24B1B] font-bold">{roundType}</span>
          </div>

          {/* Right: Latency Monitor Badge + End Session CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {screen === "live" && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E0D0] text-xs font-mono shadow-xs">
                <div className="flex items-center gap-1 text-[#C24B1B]">
                  <Zap className="w-3.5 h-3.5 fill-[#C24B1B]" />
                  <span className="font-bold">{latency}ms</span>
                </div>
                <span className="hidden lg:inline text-zinc-500">latency</span>
                <span className="hidden xl:flex items-center gap-1 text-[11px] text-emerald-700 border-l border-zinc-200 pl-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Sub-second
                </span>
              </div>
            )}

            {screen === "live" && (
              <button
                type="button"
                onClick={() => setShowConfirmEnd(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-[#C24B1B] text-[#C24B1B] bg-white hover:bg-[#C24B1B] hover:text-white transition-all text-xs font-bold active:scale-95 shadow-xs cursor-pointer"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>End Session</span>
              </button>
            )}

            {screen !== "live" && (
              <a
                href="https://github.com/monushah108"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E0D0] bg-white hover:bg-black/5 text-[#111815] text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                title="Monu Shah's GitHub Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>@monushah108</span>
              </a>
            )}

            {screen !== "live" && onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="flex items-center gap-1.5 text-xs text-[#111815] font-bold hover:bg-black/5 px-3.5 py-1.5 rounded-xl border border-[#111815]/20 bg-white transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Preferences</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* End Session Confirmation Modal */}
      {showConfirmEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#FAF8EE] border-2 border-[#111815] shadow-2xl space-y-4 text-[#111815]">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-[#C24B1B]">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#111815]">
                  End Mock Interview Session?
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  Ending this session will finalize your performance diagnostics, compile communication telemetry, and generate your comprehensive MockPulse score card.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E0D0]">
              <button
                type="button"
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-full text-xs font-bold text-zinc-700 hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel & Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmEnd(false);
                  onEndSession();
                }}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#C24B1B] hover:bg-[#BA4416] text-white shadow-lg shadow-[#C24B1B]/20 transition-all active:scale-95 cursor-pointer"
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
