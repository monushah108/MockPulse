"use client";

import React from "react";
import {
  Mic,
  MicOff,
  Hand,
  Settings,
  Sparkles,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { OrbState } from "../types/interview";

interface BottomDockProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onInterrupt: () => void;
  onOpenSettings: () => void;
  orbState: OrbState;
  onSimulateAnswer: () => void;
  onAskNextQuestion: () => void;
}

export function BottomDock({
  isMuted,
  onToggleMute,
  onInterrupt,
  onOpenSettings,
  orbState,
  onSimulateAnswer,
  onAskNextQuestion,
}: BottomDockProps) {
  return (
    <div className="relative z-30 flex items-center justify-center w-full px-4 py-3">
      {/* Floating Dock Container */}
      <div className="glass-panel-elevated rounded-2xl px-4 py-3 flex items-center gap-3 sm:gap-4 shadow-2xl border border-zinc-800/80">
        {/* 1. Interrupt AI Action Button */}
        <button
          type="button"
          onClick={onInterrupt}
          disabled={orbState !== "ai_speaking"}
          title="Interrupt AI speaking immediately (Hotkey: I or Esc)"
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
            orbState === "ai_speaking"
              ? "bg-amber-500/20 border border-amber-500/40 text-amber-200 hover:bg-amber-500/30 hover:border-amber-500/70 shadow-lg shadow-amber-500/10"
              : "opacity-40 bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          <Hand className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Interrupt AI</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-950 text-[10px] text-zinc-400 border border-zinc-800 font-mono">
            I
          </kbd>
        </button>

        {/* 2. Large Center Mute / Unmute Mic Toggle Button */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? "Unmute Microphone (Spacebar)" : "Mute Microphone (Spacebar)"}
            className={`relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-90 shadow-xl cursor-pointer ${
              isMuted
                ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30"
                : "bg-gradient-to-tr from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white shadow-indigo-600/35"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 animate-pulse" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
            <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 font-mono">
              {isMuted ? "Muted" : "Active"}
            </span>
          </button>
        </div>

        {/* 3. Settings Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Audio devices, Voice persona, and latency settings"
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
        >
          <Settings className="w-4 h-4 text-zinc-400" />
          <span className="hidden md:inline">Audio Settings</span>
        </button>

        {/* 4. Quick Testing Controls (Simulate Speech / Next Question) */}
        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-zinc-800">
          <button
            type="button"
            onClick={onSimulateAnswer}
            title="Simulate candidate speaking response"
            className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulate Answer</span>
          </button>
          <button
            type="button"
            onClick={onAskNextQuestion}
            title="Prompt AI for next interview question"
            className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/20 text-sky-300 text-[11px] font-medium transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-sky-400" />
            <span>Next Q</span>
          </button>
        </div>
      </div>
    </div>
  );
}

