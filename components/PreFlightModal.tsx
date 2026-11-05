"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Mic,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Headphones,
  Sliders,
  Volume2,
  Zap,
} from "lucide-react";
import {
  TARGET_ROLES,
  EXPERIENCE_LEVELS,
  ROUND_TYPES,
  VOICE_MODELS,
  DEFAULT_RESUME,
} from "../lib/mockData";
import { ResumeProfile, InterviewSettings } from "../types/interview";
import { StickyPaperclip, LinedPaperDoodleLeft } from "./SketchDoodles";

interface PreFlightModalProps {
  settings: InterviewSettings;
  resume: ResumeProfile;
  onUpdateSettings: (newSettings: Partial<InterviewSettings>) => void;
  onUpdateResume: (newResume: ResumeProfile) => void;
  onLaunch: () => void;
  isMicTesting: boolean;
  micVolume: number;
  micDb: number;
  frequencyData: number[];
  onToggleMicTest: () => void;
}

export function PreFlightModal({
  settings,
  resume,
  onUpdateSettings,
  onUpdateResume,
  onLaunch,
  isMicTesting,
  micVolume,
  micDb,
  frequencyData,
  onToggleMicTest,
}: PreFlightModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle actual file upload or simulated parsing
  const handleFileProcess = (file: File) => {
    setIsParsing(true);
    setTimeout(() => {
      onUpdateResume({
        ...DEFAULT_RESUME,
        fileName: file.name,
        parsedSummary: `${file.name} • 3 Projects Detected • 14 Skills Parsed • 94% Match`,
      });
      setIsParsing(false);
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
      {/* Main Pre-Flight Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full relative z-10 bg-white rounded-3xl border-2 border-[#111815] p-6 sm:p-9 space-y-8 shadow-xl"
      >
        {/* Header Intro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D0]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase font-bold bg-[#FEF08A] text-[#713F12] border border-[#FDE047]">
                Pre-Flight Setup
              </span>
              <span className="text-xs text-zinc-500 font-medium">Session Calibration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111815]">
              MockPulse Voice Agent Setup
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              Calibrate role criteria, test your audio input, and ingest your resume for real-time question steering.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-xs font-bold text-[#166534]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Voice Pipeline Online</span>
          </div>
        </div>

        {/* 1. Role, Level & Round Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Target Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111815] flex items-center justify-between">
              <span>Target Engineering Role</span>
              <span className="text-[10px] text-zinc-500 font-normal">Primary</span>
            </label>
            <div className="relative">
              <select
                value={settings.targetRole}
                onChange={(e) => onUpdateSettings({ targetRole: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-[#111815] text-xs sm:text-sm font-bold focus:outline-none focus:border-[#111815] cursor-pointer transition-colors"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role} className="bg-white text-[#111815]">
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111815] flex items-center justify-between">
              <span>Experience Level</span>
              <span className="text-[10px] text-zinc-500 font-normal">Expectations</span>
            </label>
            <div className="relative">
              <select
                value={settings.experienceLevel}
                onChange={(e) => onUpdateSettings({ experienceLevel: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-[#111815] text-xs sm:text-sm font-bold focus:outline-none focus:border-[#111815] cursor-pointer transition-colors"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-white text-[#111815]">
                    {lvl}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Interview Round */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111815] flex items-center justify-between">
              <span>Interview Round Type</span>
              <span className="text-[10px] text-[#C24B1B] font-bold">Active Focus</span>
            </label>
            <div className="relative">
              <select
                value={settings.roundType}
                onChange={(e) => onUpdateSettings({ roundType: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-[#111815] text-xs sm:text-sm font-bold focus:outline-none focus:border-[#111815] cursor-pointer transition-colors"
              >
                {ROUND_TYPES.map((rnd) => (
                  <option key={rnd} value={rnd} className="bg-white text-[#111815]">
                    {rnd}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. Resume Upload Dropzone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#111815] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#C24B1B]" />
              <span>Resume & Project Context Ingestion</span>
            </label>
            <button
              type="button"
              onClick={() => {
                onUpdateResume(DEFAULT_RESUME);
              }}
              className="text-[11px] text-[#C24B1B] hover:underline font-bold transition-colors cursor-pointer"
            >
              Use Monu&apos;s Sample Resume
            </button>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
              isDragging
                ? "border-[#111815] bg-[#FEF08A]/30 shadow-md"
                : "border-[#D4CEB8] bg-[#FAF8EE] hover:bg-[#F4F1E4] hover:border-[#111815]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
            />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF08A] border border-[#FDE047] flex items-center justify-center text-[#713F12] group-hover:scale-105 transition-transform shadow-xs">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#111815]">
                    {resume.fileName || "Upload Candidate Resume (PDF, DOCX)"}
                  </span>
                  {isParsing ? (
                    <span className="text-[10px] text-[#C24B1B] font-bold animate-pulse">
                      Parsing entities...
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Parsed
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 font-medium">
                  {resume.parsedSummary || "Drag and drop or click to browse. Max 10MB."}
                </p>
              </div>
            </div>

            {/* Extracted project tags preview styled as pastel badges */}
            <div className="mt-3 sm:mt-0 flex flex-wrap sm:flex-nowrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEF08A] border border-[#FDE047] text-[#713F12]">
                {resume.projectsCount} Projects Detected
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F3E8FF] border border-[#E9D5FF] text-[#581C87]">
                {resume.skillsCount} Skills Parsed
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] border border-[#86EFAC] text-[#166534]">
                {resume.alignmentScore}% Match
              </span>
            </div>
          </div>
        </div>

        {/* 3. Mic Check Bar & Live Audio Input Meter */}
        <div className="space-y-3 p-5 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#C24B1B]" />
                <span className="text-xs font-bold text-[#111815]">
                  Live Microphone Calibration
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#FEF08A] text-[#713F12]">
                  Web Audio API
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">
                Ensure your vocal audio input is loud and clear for the speech recognition engine.
              </p>
            </div>

            {/* Test Microphone Button */}
            <button
              type="button"
              onClick={onToggleMicTest}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer ${
                isMicTesting
                  ? "bg-[#C24B1B] text-white shadow-md shadow-[#C24B1B]/20"
                  : "bg-[#111815] hover:bg-[#202e26] text-white"
              }`}
            >
              {isMicTesting ? (
                <>
                  <Mic className="w-3.5 h-3.5 animate-bounce" />
                  <span>Listening... Stop Test</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>Test Microphone</span>
                </>
              )}
            </button>
          </div>

          {/* Live audio level meter bar */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-600">
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isMicTesting ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
                  }`}
                />
                <span className="font-medium">
                  {isMicTesting
                    ? micVolume > 15
                      ? "Microphone ready • Optimal vocal gain"
                      : "Speak into mic to calibrate dB level..."
                    : "Mic is idle • Click 'Test Microphone'"}
                </span>
              </span>
              <span className="font-mono text-zinc-500">
                Peak: <strong className="text-[#111815]">{micDb} dB</strong> / Volume: {micVolume}%
              </span>
            </div>

            {/* Spectrum Equalizer Bar Meter */}
            <div className="w-full h-3 rounded-full bg-white border border-[#E5E0D0] overflow-hidden flex items-center p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-75 ${
                  micVolume > 80
                    ? "bg-gradient-to-r from-emerald-500 via-amber-400 to-[#C24B1B]"
                    : micVolume > 20
                    ? "bg-gradient-to-r from-[#111815] to-[#C24B1B]"
                    : "bg-zinc-400"
                }`}
                style={{ width: `${Math.max(4, micVolume)}%` }}
              />
            </div>

            {/* Frequency bars preview */}
            <div className="flex items-end justify-between h-4 px-1 gap-1">
              {frequencyData.map((val, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm transition-all duration-75 ${
                    isMicTesting ? "bg-[#C24B1B]" : "bg-zinc-300"
                  }`}
                  style={{ height: `${Math.max(2, Math.min(16, (val / 100) * 16))}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4. AI Voice Model Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] border border-[#E9D5FF] flex items-center justify-center text-[#581C87]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#111815]">Interviewer AI Voice Persona</span>
              <p className="text-[11px] text-zinc-500 font-medium">Neural speech with dynamic conversational inflection</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={settings.voiceModel}
              onChange={(e) =>
                onUpdateSettings({
                  voiceModel: e.target.value as InterviewSettings["voiceModel"],
                })
              }
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815]"
            >
              {VOICE_MODELS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. Large Primary CTA: Launch Voice Interview */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onLaunch}
            className="w-full sm:w-80 h-14 rounded-full bg-[#111815] hover:bg-[#202e26] text-white font-black text-base shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Launch Voice Interview</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-[11px] text-zinc-500 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 text-[#111815] text-[10px] border border-zinc-300 font-bold">Enter</kbd> to launch immediately • Spacebar to mute during session
          </span>
        </div>
      </motion.div>
    </div>
  );
}
