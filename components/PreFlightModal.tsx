"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Mic,
  MicOff,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
  Headphones,
  Sliders,
  Volume2,
  AlertCircle,
} from "lucide-react";
import {
  TARGET_ROLES,
  EXPERIENCE_LEVELS,
  ROUND_TYPES,
  VOICE_MODELS,
  DEFAULT_RESUME,
} from "../lib/mockData";
import { ResumeProfile, InterviewSettings } from "../types/interview";

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
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Pre-Flight Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full relative z-10 glass-panel-elevated rounded-3xl p-6 sm:p-9 space-y-8"
      >
        {/* Header Intro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                Pre-Flight Setup
              </span>
              <span className="text-xs text-zinc-500">Step 1 of 2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              MockPulse Voice Agent Setup
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Calibrate role criteria, test your audio input, and ingest your resume for real-time question steering.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Voice Pipeline Online</span>
          </div>
        </div>

        {/* 1. Role, Level & Round Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Target Role */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Target Engineering Role</span>
              <span className="text-[10px] text-zinc-500 font-normal">Primary</span>
            </label>
            <div className="relative">
              <select
                value={settings.targetRole}
                onChange={(e) => onUpdateSettings({ targetRole: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-[#27272a] text-zinc-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role} className="bg-zinc-900 text-zinc-100">
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Experience Level</span>
              <span className="text-[10px] text-zinc-500 font-normal">Expectations</span>
            </label>
            <div className="relative">
              <select
                value={settings.experienceLevel}
                onChange={(e) => onUpdateSettings({ experienceLevel: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-[#27272a] text-zinc-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-zinc-900 text-zinc-100">
                    {lvl}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Interview Round */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Interview Round Type</span>
              <span className="text-[10px] text-indigo-400 font-normal">Active Focus</span>
            </label>
            <div className="relative">
              <select
                value={settings.roundType}
                onChange={(e) => onUpdateSettings({ roundType: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-[#27272a] text-zinc-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
              >
                {ROUND_TYPES.map((rnd) => (
                  <option key={rnd} value={rnd} className="bg-zinc-900 text-zinc-100">
                    {rnd}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. Resume Upload Dropzone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Resume & Project Context Ingestion</span>
            </label>
            <button
              type="button"
              onClick={() => {
                onUpdateResume(DEFAULT_RESUME);
              }}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium transition-colors"
            >
              Use Monu&apos;s Sample Resume
            </button>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl border border-dashed transition-all cursor-pointer ${
              isDragging
                ? "border-indigo-500 bg-indigo-950/30 shadow-lg shadow-indigo-500/10"
                : "border-[#27272a] bg-zinc-950/50 hover:bg-zinc-900/60 hover:border-zinc-700"
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
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-100">
                    {resume.fileName || "Upload Candidate Resume (PDF, DOCX)"}
                  </span>
                  {isParsing ? (
                    <span className="text-[10px] text-indigo-400 animate-pulse">
                      Parsing entities...
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Parsed
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400">
                  {resume.parsedSummary || "Drag and drop or click to browse. Max 10MB."}
                </p>
              </div>
            </div>

            {/* Extracted project tags preview */}
            <div className="mt-3 sm:mt-0 flex flex-wrap sm:flex-nowrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                {resume.projectsCount} Projects Detected
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                {resume.skillsCount} Skills Parsed
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                {resume.alignmentScore}% Role Alignment
              </span>
            </div>
          </div>
        </div>

        {/* 3. Mic Check Bar & Live Audio Input Meter */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/60 border border-[#27272a]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  Live Microphone Calibration
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-sky-500/15 text-sky-400">
                  Web Audio API
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Ensure your vocal audio input is loud and clear for the speech recognition engine.
              </p>
            </div>

            {/* Test Microphone Button */}
            <button
              type="button"
              onClick={onToggleMicTest}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-sm ${
                isMicTesting
                  ? "bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-sky-500/25"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
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
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isMicTesting ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                  }`}
                />
                <span>
                  {isMicTesting
                    ? micVolume > 15
                      ? "Microphone ready • Optimal vocal gain"
                      : "Speak into mic to calibrate dB level..."
                    : "Mic is idle • Click 'Test Microphone'"}
                </span>
              </span>
              <span className="font-mono text-zinc-500">
                Peak: <strong className="text-zinc-300">{micDb} dB</strong> / Volume: {micVolume}%
              </span>
            </div>

            {/* Spectrum Equalizer Bar Meter */}
            <div className="w-full h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-75 ${
                  micVolume > 80
                    ? "bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500"
                    : micVolume > 20
                    ? "bg-gradient-to-r from-sky-500 to-emerald-400"
                    : "bg-zinc-700"
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
                    isMicTesting ? "bg-sky-400/80" : "bg-zinc-800"
                  }`}
                  style={{ height: `${Math.max(2, Math.min(16, (val / 100) * 16))}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4. AI Voice Model Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-200">Interviewer AI Voice Persona</span>
              <p className="text-[11px] text-zinc-400">Ultra-natural neural speech with dynamic inflection</p>
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
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 focus:outline-none focus:border-indigo-500"
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
          <div className="relative group w-full sm:w-auto">
            {/* Pulsing Gradient Ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 opacity-70 blur-md group-hover:opacity-100 animate-pulse-ring pointer-events-none" />

            <button
              type="button"
              onClick={onLaunch}
              className="relative w-full sm:w-80 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Launch Voice Interview</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <span className="text-[11px] text-zinc-500 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] border border-zinc-700">Enter</kbd> to launch immediately • Spacebar to mute during session
          </span>
        </div>
      </motion.div>
    </div>
  );
}

