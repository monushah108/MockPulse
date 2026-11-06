"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Play,
  Square,
  RefreshCw,
  Activity,
  Check,
} from "lucide-react";
import {
  TARGET_ROLES,
  EXPERIENCE_LEVELS,
  ROUND_TYPES,
  VOICE_MODELS,
  DEFAULT_RESUME,
} from "../lib/mockData";
import { ResumeProfile, InterviewSettings } from "../types/interview";
import { VoiceValidationStatus } from "../lib/useAudioEngine";
import { StickyPaperclip, LinedPaperDoodleLeft } from "./SketchDoodles";

export interface PreFlightModalProps {
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
  // Voice Validation additions
  validationStatus?: VoiceValidationStatus;
  speechProgress?: number;
  recordedAudioUrl?: string | null;
  isPlayingPlayback?: boolean;
  isAiSpeakingTest?: boolean;
  voiceClarityScore?: number;
  detectedSnrDb?: number;
  onPlayRecordedSample?: () => void;
  onTestAiVoice?: (voiceName: string) => void;
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
  validationStatus = "idle",
  speechProgress = 0,
  recordedAudioUrl = null,
  isPlayingPlayback = false,
  isAiSpeakingTest = false,
  voiceClarityScore = 95,
  detectedSnrDb = 26,
  onPlayRecordedSample,
  onTestAiVoice,
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

  const isValidated = validationStatus === "validated";

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
                Pre-Flight Calibration
              </span>
              <span className="text-xs font-mono text-zinc-500">• Step 1 of 2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111815] tracking-tight">
              Configure Your Interview Session
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              Calibrate role focus, ingest resume projects, and validate your live voice input.
            </p>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FEF08A] border border-[#FDE047] text-xs font-bold text-[#713F12] shadow-xs rotate-2">
              <StickyPaperclip />
              <span>Ready for voice round</span>
            </div>
          </div>
        </div>

        {/* 1. Target Role & Experience Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Target Role Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111815] flex items-center justify-between">
              <span>Target Role</span>
              <span className="text-[10px] text-zinc-400 font-normal">Primary track</span>
            </label>
            <div className="relative">
              <select
                value={settings.targetRole}
                onChange={(e) => onUpdateSettings({ targetRole: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815] cursor-pointer hover:bg-[#f4f1e4] transition-colors pr-9"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Experience Level Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111815] flex items-center justify-between">
              <span>Experience Level</span>
              <span className="text-[10px] text-zinc-400 font-normal">Seniority</span>
            </label>
            <div className="relative">
              <select
                value={settings.experienceLevel}
                onChange={(e) => onUpdateSettings({ experienceLevel: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815] cursor-pointer hover:bg-[#f4f1e4] transition-colors pr-9"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Round Type Dropdown */}
          <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
            <label className="text-xs font-bold text-[#111815] flex items-center justify-between">
              <span>Interview Round</span>
              <span className="text-[10px] text-zinc-400 font-normal">Focus area</span>
            </label>
            <div className="relative">
              <select
                value={settings.roundType}
                onChange={(e) => onUpdateSettings({ roundType: e.target.value })}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815] cursor-pointer hover:bg-[#f4f1e4] transition-colors pr-9"
              >
                {ROUND_TYPES.map((rnd) => (
                  <option key={rnd} value={rnd}>
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

        {/* 3. WORKING TEST VOICE VALIDATION SUITE */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0] relative overflow-hidden">
          {/* Top row: Section title & Real-Time Validation Status Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#C24B1B]" />
                <span className="text-xs font-bold text-[#111815]">
                  Voice Stream & Microphone Validation
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#FEF08A] text-[#713F12]">
                  Web Audio + VAD
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">
                Verify input gain, test speech activity detection, and listen to your voice playback.
              </p>
            </div>

            {/* Status Pill Indicator */}
            <div>
              {isValidated ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-xs font-bold text-[#166534] shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Voice Validated ({voiceClarityScore}% Clarity)</span>
                </div>
              ) : isMicTesting ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] border border-[#FDE047] text-xs font-bold text-[#713F12] shadow-xs animate-pulse">
                  <Activity className="w-3.5 h-3.5 text-[#C24B1B]" />
                  <span>
                    {speechProgress >= 100
                      ? "Analyzing Gain..."
                      : `Calibrating Speech (${speechProgress}%)`}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D0] text-xs font-medium text-zinc-600 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Uncalibrated (Click to Test)</span>
                </div>
              )}
            </div>
          </div>

          {/* Prompt banner during calibration */}
          {isMicTesting && !isValidated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 rounded-xl bg-white border border-amber-300 text-xs text-[#713F12] flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#C24B1B] animate-bounce shrink-0" />
                <span className="font-semibold">
                  Prompt: Say out loud: &ldquo;Hello! I am ready for the technical round.&rdquo;
                </span>
              </div>
              <div className="w-24 bg-amber-100 rounded-full h-2 overflow-hidden shrink-0 border border-amber-200">
                <div
                  className="bg-[#C24B1B] h-full transition-all duration-150"
                  style={{ width: `${speechProgress}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* Validated Celebration Pill */}
          {isValidated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#166534] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="font-bold">
                  Acoustic test passed: Clear vocal signal detected • Optimal SNR (+{detectedSnrDb}dB) • 0% clipping
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#166534]/80">
                Sample Rate: 44.1 kHz • Latency: &lt;600ms
              </span>
            </motion.div>
          )}

          {/* Live audio level meter & 16-band spectrum equalizer */}
          <div className="space-y-2 pt-1 bg-white p-3.5 rounded-xl border border-[#E5E0D0]">
            <div className="flex items-center justify-between text-[11px] text-zinc-600">
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isMicTesting
                      ? "bg-emerald-500 animate-pulse"
                      : isValidated
                      ? "bg-emerald-500"
                      : "bg-zinc-400"
                  }`}
                />
                <span className="font-medium">
                  {isMicTesting
                    ? micVolume > 15
                      ? "Voice Activity Detected • Good Vocal Gain"
                      : "Speak into mic to calibrate dB level..."
                    : isValidated
                    ? "Microphone calibrated and ready"
                    : "Mic is idle • Click 'Run Voice Check'"}
                </span>
              </span>
              <span className="font-mono text-zinc-500 text-[10px] sm:text-[11px]">
                Peak: <strong className="text-[#111815]">{micDb} dB</strong> • Level: {micVolume}%
              </span>
            </div>

            {/* Spectrum Equalizer Bar Meter */}
            <div className="w-full h-3 rounded-full bg-[#FAF8EE] border border-[#E5E0D0] overflow-hidden flex items-center p-0.5">
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

            {/* 16-band Frequency Spectrum Bars */}
            <div className="flex items-end justify-between h-5 px-1 gap-1">
              {frequencyData.map((val, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm transition-all duration-75 ${
                    isMicTesting
                      ? "bg-[#C24B1B]"
                      : isValidated
                      ? "bg-emerald-600"
                      : "bg-zinc-300"
                  }`}
                  style={{ height: `${Math.max(2, Math.min(20, (val / 100) * 20))}px` }}
                />
              ))}
            </div>
          </div>

          {/* Interactive Action Controls */}
          <div className="pt-1 flex flex-wrap items-center gap-2.5">
            {/* 1. Main Toggle / Run Voice Check Button */}
            <button
              type="button"
              onClick={onToggleMicTest}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer ${
                isMicTesting
                  ? "bg-[#C24B1B] text-white shadow-md shadow-[#C24B1B]/20"
                  : isValidated
                  ? "bg-white hover:bg-zinc-100 text-[#111815] border border-[#111815]"
                  : "bg-[#111815] hover:bg-[#202e26] text-white"
              }`}
            >
              {isMicTesting ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop Voice Check</span>
                </>
              ) : isValidated ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-Test Microphone</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>Run Voice Check</span>
                </>
              )}
            </button>

            {/* 2. Hear Yourself Back (Audio Echo Playback) */}
            <button
              type="button"
              onClick={onPlayRecordedSample}
              disabled={!isValidated && !recordedAudioUrl}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-xs ${
                isValidated || recordedAudioUrl
                  ? "bg-white hover:bg-zinc-50 border border-[#E5E0D0] text-[#111815] cursor-pointer"
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed"
              }`}
              title={isValidated ? "Listen to your recorded microphone sample" : "Validate voice first"}
            >
              {isPlayingPlayback ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 animate-pulse" />
                  <span className="text-emerald-700 font-bold">Playing Back Voice...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#111815]" />
                  <span>Hear Yourself Back</span>
                </>
              )}
            </button>

            {/* 3. Test AI Speaker (Proves candidate can hear the agent) */}
            <button
              type="button"
              onClick={() => onTestAiVoice && onTestAiVoice(settings.voiceModel.split(" ")[0])}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer ${
                isAiSpeakingTest
                  ? "bg-[#FEF08A] text-[#713F12] border border-[#FDE047] animate-pulse"
                  : "bg-white hover:bg-zinc-50 border border-[#E5E0D0] text-[#111815]"
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-[#581C87]" />
              <span>
                {isAiSpeakingTest
                  ? "AI Speaking Test Audio..."
                  : "Test AI Voice Output"}
              </span>
            </button>
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
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815] cursor-pointer"
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
            className={`w-full sm:w-80 h-14 rounded-full font-black text-base shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer group ${
              isValidated
                ? "bg-[#111815] hover:bg-[#202e26] text-white ring-4 ring-[#FEF08A]/60"
                : "bg-[#111815] hover:bg-[#202e26] text-white"
            }`}
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Launch Voice Interview</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] text-zinc-500 font-mono">
            {isValidated && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Mic & Voice Validated
              </span>
            )}
            <span>
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 text-[#111815] text-[10px] border border-zinc-300 font-bold">Enter</kbd> to launch immediately • Spacebar to mute
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
