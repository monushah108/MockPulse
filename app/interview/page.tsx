"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { PreFlightModal } from "../../components/PreFlightModal";
import { OrbVisualizer } from "../../components/OrbVisualizer";
import { BottomDock } from "../../components/BottomDock";
import { SettingsDrawer } from "../../components/SettingsDrawer";
import { PostInterviewReport } from "../../components/PostInterviewReport";
import { useAudioEngine } from "../../lib/useAudioEngine";
import {
  DEFAULT_RESUME,
  INITIAL_TRANSCRIPT_DIALOGUES,
  MOCK_NEXT_QUESTIONS,
  SAMPLE_POST_REPORT,
} from "../../lib/mockData";
import {
  AppScreen,
  OrbState,
  InterviewSettings,
  ResumeProfile,
  TranscriptItem,
  PostInterviewMetrics,
} from "../../types/interview";

export default function InterviewPage() {
  // Screen state: "setup" | "live" | "report"
  const [screen, setScreen] = useState<AppScreen>("setup");

  // Visualizer Orb state: "ai_speaking" | "listening" | "thinking" | "idle"
  const [orbState, setOrbState] = useState<OrbState>("idle");

  // Settings
  const [settings, setSettings] = useState<InterviewSettings>({
    targetRole: "Full-Stack Engineer",
    experienceLevel: "Mid-Level (3-5 yrs)",
    roundType: "Round 1: Technical & Algorithms",
    voiceModel: "Nova (Warm & Conversational)",
    audioInputDevice: "Default Microphone (System Default)",
    bargeInEnabled: true,
    noiseSuppression: true,
    speed: 1.0,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Resume profile
  const [resume, setResume] = useState<ResumeProfile>(DEFAULT_RESUME);

  // Transcript turns & live streaming text for post-report telemetry
  const [transcript, setTranscript] = useState<TranscriptItem[]>(INITIAL_TRANSCRIPT_DIALOGUES);
  const [streamingText, setStreamingText] = useState<string>("");
  const [streamingSpeaker, setStreamingSpeaker] = useState<"ai" | "candidate">("ai");
  const nextQuestionIndexRef = useRef(0);

  // Session duration timer
  const [durationSeconds, setDurationSeconds] = useState(258);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Post interview metrics report
  const [reportMetrics, setReportMetrics] = useState<PostInterviewMetrics>(SAMPLE_POST_REPORT);

  // Web Audio engine
  const {
    isMicTesting,
    micVolume,
    micDb,
    frequencyData,
    isMuted,
    toggleMicTest,
    toggleMute,
    playChime,
    stopMic,
  } = useAudioEngine();

  // Update Settings
  const handleUpdateSettings = (newSettings: Partial<InterviewSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Launch interview from Pre-Flight
  const handleLaunchInterview = () => {
    playChime("start");
    setScreen("live");
    setOrbState("listening");

    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);
  };

  // End Interview Session
  const handleEndSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopMic();
    playChime("complete");

    // Compute updated post-interview metrics
    setReportMetrics({
      ...SAMPLE_POST_REPORT,
      dialogueCount: transcript.length,
      totalDurationSeconds: durationSeconds,
    });

    setScreen("report");
  };

  // Restart Interview to Setup
  const handleRestart = () => {
    setDurationSeconds(0);
    setStreamingText("");
    setOrbState("idle");
    setScreen("setup");
  };

  // Stream text word by word simulation
  const streamUtterance = useCallback(
    (
      fullText: string,
      speaker: "ai" | "candidate",
      category?: TranscriptItem["category"],
      feedbackTags?: string[],
      onDone?: () => void
    ) => {
      setStreamingSpeaker(speaker);
      const words = fullText.split(" ");
      let currentIdx = 0;
      setStreamingText("");

      const interval = setInterval(() => {
        if (currentIdx < words.length) {
          setStreamingText(words.slice(0, currentIdx + 1).join(" "));
          currentIdx++;
        } else {
          clearInterval(interval);
          setStreamingText("");

          const minutes = Math.floor(durationSeconds / 60);
          const seconds = durationSeconds % 60;
          const pad = (n: number) => n.toString().padStart(2, "0");
          const timestamp = `${pad(minutes)}:${pad(seconds)}`;

          const newItem: TranscriptItem = {
            id: `tx-${Date.now()}`,
            speaker,
            text: fullText,
            timestamp,
            category,
            feedbackTags,
            latencyMs: speaker === "candidate" ? 590 + Math.floor(Math.random() * 80) : undefined,
          };

          setTranscript((prev) => [...prev, newItem]);
          if (onDone) onDone();
        }
      }, 75);
    },
    [durationSeconds]
  );

  // Interrupt AI Action
  const handleInterruptAI = () => {
    if (orbState !== "ai_speaking") return;
    playChime("interrupt");
    setStreamingText("");
    setOrbState("listening");

    const newItem: TranscriptItem = {
      id: `tx-bargein-${Date.now()}`,
      speaker: "candidate",
      text: "[Candidate interrupted AI — Barged in with response]",
      timestamp: "Live",
      category: "Behavioral",
      feedbackTags: ["Active Barge-In", "Low Latency Pivot"],
    };
    setTranscript((prev) => [...prev, newItem]);
  };

  // Simulate Candidate Answer
  const handleSimulateAnswer = () => {
    const nextItem = MOCK_NEXT_QUESTIONS[nextQuestionIndexRef.current % MOCK_NEXT_QUESTIONS.length];
    setOrbState("listening");

    streamUtterance(
      nextItem.candidateAnswer,
      "candidate",
      nextItem.category,
      nextItem.feedbackTags,
      () => {
        setOrbState("thinking");
        setTimeout(() => {
          handleAskNextQuestion();
        }, 1200);
      }
    );
  };

  // Ask Next Question from AI
  const handleAskNextQuestion = () => {
    const nextItem = MOCK_NEXT_QUESTIONS[nextQuestionIndexRef.current % MOCK_NEXT_QUESTIONS.length];
    nextQuestionIndexRef.current = (nextQuestionIndexRef.current + 1) % MOCK_NEXT_QUESTIONS.length;

    setOrbState("ai_speaking");
    streamUtterance(
      nextItem.aiQuestion,
      "ai",
      nextItem.category,
      ["Next Probing Turn", `${nextItem.category} Question`],
      () => {
        setOrbState("listening");
      }
    );
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === "Space" && screen === "live") {
        e.preventDefault();
        toggleMute();
      } else if ((e.key === "i" || e.key === "I" || e.key === "Escape") && screen === "live") {
        e.preventDefault();
        handleInterruptAI();
      } else if (e.key === "Enter" && screen === "setup") {
        e.preventDefault();
        handleLaunchInterview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, toggleMute, orbState]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8EE] bg-hero-grid text-[#111815] selection:bg-yellow-200 selection:text-black">
      {/* Top Header Bar */}
      <Header
        screen={screen}
        targetRole={settings.targetRole}
        roundType={settings.roundType}
        durationSeconds={durationSeconds}
        onEndSession={handleEndSession}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-3 sm:px-6 py-4">
        {screen === "setup" && (
          <div className="w-full max-w-4xl flex items-center justify-between pb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111815] hover:bg-black/5 transition-colors py-1.5 px-3.5 rounded-full bg-white border border-[#E5E0D0] shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>MockPulse Engine v2.4</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* 1. SETUP / PRE-FLIGHT VIEW */}
          {screen === "setup" && (
            <motion.div
              key="setup-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PreFlightModal
                settings={settings}
                resume={resume}
                onUpdateSettings={handleUpdateSettings}
                onUpdateResume={setResume}
                onLaunch={handleLaunchInterview}
                isMicTesting={isMicTesting}
                micVolume={micVolume}
                micDb={micDb}
                frequencyData={frequencyData}
                onToggleMicTest={toggleMicTest}
              />
            </motion.div>
          )}

          {/* 2. ACTIVE LIVE INTERVIEW SCREEN (Pure Centered Voice Studio) */}
          {screen === "live" && (
            <motion.div
              key="live-screen"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="w-full flex-1 flex flex-col items-center justify-center h-[calc(100vh-5.5rem)] max-w-4xl mx-auto"
            >
              <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#111815] shadow-xl relative overflow-hidden">
                {/* Subtle warm glow behind orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />

                {/* Sub-Header inside Panel */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-[#111815]">
                      Real-Time Voice Pipeline
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-[11px] font-mono font-bold text-[#C24B1B]">
                      {settings.voiceModel.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-zinc-600 bg-[#FAF8EE] px-3 py-1 rounded-full border border-[#E5E0D0] shadow-xs">
                    <span>Input Gain:</span>
                    <strong className="text-[#111815]">
                      {isMuted ? "MUTED" : `${micVolume}%`}
                    </strong>
                  </div>
                </div>

                {/* Central Multi-Wave Animated Orb Visualizer */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-4">
                  <OrbVisualizer
                    state={orbState}
                    micVolume={micVolume}
                    frequencyData={frequencyData}
                    onStateChange={setOrbState}
                    isMuted={isMuted}
                  />
                </div>

                {/* Bottom Floating Dock Controls */}
                <div className="relative z-20">
                  <BottomDock
                    isMuted={isMuted}
                    onToggleMute={toggleMute}
                    onInterrupt={handleInterruptAI}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    orbState={orbState}
                    onSimulateAnswer={handleSimulateAnswer}
                    onAskNextQuestion={handleAskNextQuestion}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. POST-INTERVIEW REPORT VIEW */}
          {screen === "report" && (
            <motion.div
              key="report-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PostInterviewReport
                metrics={reportMetrics}
                transcript={transcript}
                targetRole={settings.targetRole}
                roundType={settings.roundType}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Drawer Modal */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
