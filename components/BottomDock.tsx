"use client";

import React from "react";
import {
  Mic,
  MicOff,
  Hand,
  Settings,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Square,
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
  onSubmitCandidateAnswer?: () => void;
  hasSpokenText?: boolean;
  isListeningPaused?: boolean;
  onTogglePauseResumeListening?: () => void;
  onReadQuestionAloud?: () => void;
  isReadingQuestion?: boolean;
}

export function BottomDock({
  isMuted,
  onToggleMute,
  onInterrupt,
  onOpenSettings,
  orbState,
  onSimulateAnswer,
  onAskNextQuestion,
  onSubmitCandidateAnswer,
  hasSpokenText = false,
  isListeningPaused = false,
  onTogglePauseResumeListening,
  onReadQuestionAloud,
  isReadingQuestion = false,
}: BottomDockProps) {
  return (
    <div className="relative z-30 flex items-center justify-center w-full px-2 sm:px-4 py-2">
      {/* Floating Dock Container */}
      <div className="rounded-3xl bg-white border-2 border-[#111815] px-3 sm:px-5 py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 shadow-xl max-w-4xl">
        {/* 1. Pause / Resume Listening Button */}
        {onTogglePauseResumeListening && (
          <button
            type="button"
            onClick={onTogglePauseResumeListening}
            title={
              isListeningPaused
                ? "Resume candidate speech recognition (Hotkey: P)"
                : "Pause speech recognition (Hotkey: P)"
            }
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
              isListeningPaused
                ? "bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse"
                : "bg-amber-100 hover:bg-amber-200 border border-amber-300 text-[#78350F]"
            }`}
          >
            {isListeningPaused ? (
              <>
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Resume Listening</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 text-[#78350F]" />
                <span className="hidden sm:inline">Pause Listening</span>
                <span className="sm:hidden">Pause</span>
              </>
            )}
            <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-black/10 text-[10px] font-mono">
              P
            </kbd>
          </button>
        )}

        {/* 2. Read Question Aloud Speaker Button */}
        {onReadQuestionAloud && (
          <button
            type="button"
            onClick={onReadQuestionAloud}
            title={
              isReadingQuestion
                ? "Stop reading question aloud (Hotkey: L)"
                : "Read current question aloud to me (Hotkey: L)"
            }
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
              isReadingQuestion
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-md shadow-red-500/20"
                : "bg-[#FEF08A] hover:bg-[#FDE047] border border-[#FDE047] text-[#713F12]"
            }`}
          >
            {isReadingQuestion ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Reading</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#C24B1B]" />
                <span className="hidden sm:inline">Read Question</span>
                <span className="sm:hidden">Read</span>
              </>
            )}
            <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-black/10 text-[10px] font-mono">
              L
            </kbd>
          </button>
        )}

        {/* 3. Center Mic Mute / Unmute Toggle Button */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? "Unmute Microphone (Spacebar)" : "Mute Microphone (Spacebar)"}
            className={`relative w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-90 shadow-lg cursor-pointer ${
              isMuted
                ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30"
                : "bg-[#111815] hover:bg-[#202e26] text-white shadow-[#111815]/30"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-5 sm:w-6 h-5 sm:h-6 animate-pulse" />
            ) : (
              <Mic className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-300" />
            )}
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider mt-0.5 font-mono">
              {isMuted ? "Muted" : "Active"}
            </span>
          </button>
        </div>

        {/* 4. Done Speaking / Submit Voice Answer Button (Shows when listening) */}
        {!isListeningPaused && orbState === "listening" && onSubmitCandidateAnswer && (
          <button
            type="button"
            onClick={onSubmitCandidateAnswer}
            title="Submit your spoken answer to AI (Enter key)"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md shadow-emerald-600/25 animate-in fade-in"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">Done Speaking</span>
            <span className="sm:hidden">Submit</span>
          </button>
        )}

        {/* 5. Settings Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Audio devices, Voice persona, and speech speed"
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-2xl bg-[#FAF8EE] hover:bg-[#F4F1E4] border border-[#E5E0D0] text-[#111815] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <Settings className="w-4 h-4 text-zinc-600" />
          <span className="hidden md:inline">Settings</span>
        </button>

        {/* 6. Quick Testing Controls (Simulate Speech / Next Question) */}
        <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-zinc-200">
          <button
            type="button"
            onClick={onSimulateAnswer}
            title="Simulate candidate speaking response"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-[#FAF8EE] hover:bg-[#FEF08A] border border-[#E5E0D0] text-[#713F12] text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C24B1B]" />
            <span className="hidden lg:inline">Simulate</span>
          </button>
          <button
            type="button"
            onClick={onAskNextQuestion}
            title="Prompt AI for next interview question"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-[#F3E8FF] hover:bg-[#E9D5FF] border border-[#E9D5FF] text-[#581C87] text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-[#7E22CE]" />
            <span>Next Q</span>
          </button>
        </div>
      </div>
    </div>
  );
}
