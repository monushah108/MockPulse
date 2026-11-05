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
    <div className="relative z-30 flex items-center justify-center w-full px-4 py-2">
      {/* Floating Dock Container */}
      <div className="rounded-3xl bg-white border-2 border-[#111815] px-4 py-3 flex items-center gap-3 sm:gap-4 shadow-xl">
        {/* 1. Interrupt AI Action Button */}
        <button
          type="button"
          onClick={onInterrupt}
          disabled={orbState !== "ai_speaking"}
          title="Interrupt AI speaking immediately (Hotkey: I or Esc)"
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            orbState === "ai_speaking"
              ? "bg-[#C24B1B] text-white shadow-md shadow-[#C24B1B]/20 hover:bg-[#BA4416]"
              : "opacity-40 bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
        >
          <Hand className="w-4 h-4 text-yellow-200" />
          <span className="hidden sm:inline">Interrupt AI</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/20 text-[10px] text-white font-mono">
            I
          </kbd>
        </button>

        {/* 2. Large Center Mute / Unmute Mic Toggle Button */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? "Unmute Microphone (Spacebar)" : "Mute Microphone (Spacebar)"}
            className={`relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-90 shadow-lg cursor-pointer ${
              isMuted
                ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30"
                : "bg-[#111815] hover:bg-[#202e26] text-white shadow-[#111815]/30"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 animate-pulse" />
            ) : (
              <Mic className="w-6 h-6 text-yellow-300" />
            )}
            <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 font-mono">
              {isMuted ? "Muted" : "Active"}
            </span>
          </button>
        </div>

        {/* 3. Settings Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Audio devices, Voice persona, and latency settings"
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#FAF8EE] hover:bg-[#F4F1E4] border border-[#E5E0D0] text-[#111815] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <Settings className="w-4 h-4 text-zinc-600" />
          <span className="hidden md:inline">Settings</span>
        </button>

        {/* 4. Quick Testing Controls (Simulate Speech / Next Question) */}
        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-zinc-200">
          <button
            type="button"
            onClick={onSimulateAnswer}
            title="Simulate candidate speaking response"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FEF08A] hover:bg-[#FDE047] border border-[#FDE047] text-[#713F12] text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C24B1B]" />
            <span>Simulate Answer</span>
          </button>
          <button
            type="button"
            onClick={onAskNextQuestion}
            title="Prompt AI for next interview question"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F3E8FF] hover:bg-[#E9D5FF] border border-[#E9D5FF] text-[#581C87] text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-[#7E22CE]" />
            <span>Next Q</span>
          </button>
        </div>
      </div>
    </div>
  );
}
