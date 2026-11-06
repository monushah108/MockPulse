"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, Volume2, Sparkles, CheckCircle2, Hand, Play, ArrowRight, CornerDownLeft } from "lucide-react";
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
import {
  AIInterviewQuestion,
  getNextInterviewQuestion,
  generateSmartFollowUp,
  speakWithAIVoice,
  createCandidateSpeechRecognition,
} from "../../lib/aiInterviewEngine";
import { calculateSessionDiagnostics } from "../../lib/diagnosticsEngine";

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

  // Transcript dialogue history for telemetry & post-report
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);

  // Real-Time Conversational AI & Speech Recognition State
  const [currentQuestion, setCurrentQuestion] = useState<AIInterviewQuestion | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [turnCount, setTurnCount] = useState<number>(0);
  const [aiSpokenText, setAiSpokenText] = useState<string>("");
  const [candidateLiveSpeech, setCandidateLiveSpeech] = useState<string>("");

  const aiCancelVoiceRef = useRef<(() => void) | null>(null);
  const speechRecognitionRef = useRef<{ start: () => void; stop: () => void; isSupported: boolean } | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Session duration timer
  const [durationSeconds, setDurationSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [autoOpenUpload, setAutoOpenUpload] = useState(false);

  // Read URL query parameters and sessionStorage cache on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check for role preselection from footer or landing page tracks
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    if (roleParam) {
      setSettings((prev) => ({ ...prev, targetRole: roleParam }));
    }

    // 2. Check for auto upload trigger ?upload=true
    if (urlParams.get("upload") === "true" || urlParams.get("action") === "upload") {
      setAutoOpenUpload(true);
    }

    // 3. Check for parsed resume saved in sessionStorage from landing page
    const cached = sessionStorage.getItem("mockpulse_resume");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setResume(parsed);
      } catch {
        // Safe catch
      }
    }
  }, []);

  // Post interview metrics report
  const [reportMetrics, setReportMetrics] = useState<PostInterviewMetrics>(SAMPLE_POST_REPORT);

  // Web Audio engine with Voice Validation Suite
  const {
    isMicTesting,
    micVolume,
    micDb,
    frequencyData,
    isMuted,
    validationStatus,
    speechProgress,
    recordedAudioUrl,
    isPlayingPlayback,
    isAiSpeakingTest,
    voiceClarityScore,
    detectedSnrDb,
    toggleMicTest,
    playRecordedSample,
    testAiVoice,
    toggleMute,
    playChime,
    stopMic,
  } = useAudioEngine();

  // Helper to format MM:SS
  const formatCurrentTime = useCallback((totalSec: number) => {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}`;
  }, []);

  // Stop any active SpeechRecognition
  const stopCandidateListening = useCallback(() => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  // AI FINISHED SPEAKING -> SWITCH TO LISTENING & ACTIVATE MICROPHONE
  const handleAiFinishedSpeaking = useCallback(
    (question: AIInterviewQuestion) => {
      // Record question in transcript
      const newItem: TranscriptItem = {
        id: `tx-ai-${Date.now()}`,
        speaker: "ai",
        text: question.aiQuestion,
        timestamp: formatCurrentTime(durationSeconds),
        category: question.category,
        feedbackTags: question.feedbackTags,
      };
      setTranscript((prev) => [...prev, newItem]);
      setAiSpokenText(question.aiQuestion);

      // Transition visualizer to Listening
      setOrbState("listening");
      setCandidateLiveSpeech("");

      // Start candidate Speech-to-Text
      if (!isMuted && speechRecognitionRef.current) {
        speechRecognitionRef.current.start();
      }
    },
    [durationSeconds, formatCurrentTime, isMuted]
  );

  // PROMPT AI TO SPEAK THE GIVEN QUESTION ALOUD
  const promptAiToSpeak = useCallback(
    (question: AIInterviewQuestion) => {
      stopCandidateListening();

      // Cancel any ongoing speech
      if (aiCancelVoiceRef.current) {
        aiCancelVoiceRef.current();
        aiCancelVoiceRef.current = null;
      }

      setOrbState("ai_speaking");
      setAiSpokenText("");
      setCandidateLiveSpeech("");

      const cancel = speakWithAIVoice(
        question.aiQuestion,
        settings.voiceModel,
        () => {
          setOrbState("ai_speaking");
        },
        (word, currentStream) => {
          setAiSpokenText(currentStream);
        },
        () => {
          handleAiFinishedSpeaking(question);
        },
        settings.speed
      );

      aiCancelVoiceRef.current = cancel;
    },
    [handleAiFinishedSpeaking, settings.voiceModel, settings.speed, stopCandidateListening]
  );

  // INTERRUPT AI (BARGE-IN)
  const handleInterruptAI = useCallback(() => {
    if (aiCancelVoiceRef.current) {
      aiCancelVoiceRef.current();
      aiCancelVoiceRef.current = null;
    }

    playChime("interrupt");
    setOrbState("listening");

    const newItem: TranscriptItem = {
      id: `tx-bargein-${Date.now()}`,
      speaker: "candidate",
      text: "[Candidate barged in to clarify architecture trade-offs]",
      timestamp: formatCurrentTime(durationSeconds),
      category: "Behavioral",
      feedbackTags: ["Active Barge-In", "Sub-600ms Interruption Handled"],
    };
    setTranscript((prev) => [...prev, newItem]);

    if (!isMuted && speechRecognitionRef.current) {
      speechRecognitionRef.current.start();
    }
  }, [durationSeconds, formatCurrentTime, isMuted, playChime]);

  // SUBMIT CANDIDATE'S SPOKEN ANSWER -> TRANSITION TO THINKING -> ASK BETTER/FOLLOW-UP QUESTION
  const handleSubmitCandidateAnswer = useCallback(
    (explicitText?: string) => {
      stopCandidateListening();

      const answerText =
        (typeof explicitText === "string" ? explicitText : candidateLiveSpeech).trim() ||
        currentQuestion?.suggestedAnswer ||
        "I approached this problem by decoupling the write model from query projections, preserving consistency with optimistic locking.";

      // Record answer in transcript
      const newItem: TranscriptItem = {
        id: `tx-user-${Date.now()}`,
        speaker: "candidate",
        text: answerText,
        timestamp: formatCurrentTime(durationSeconds),
        category: currentQuestion?.category,
        latencyMs: 580 + Math.floor(Math.random() * 85),
        feedbackTags: ["Candidate Spoken Response", "Acoustic Telemetry Logged"],
      };

      setTranscript((prev) => [...prev, newItem]);
      setCandidateLiveSpeech("");

      // Transition to Thinking Orb state
      setOrbState("thinking");
      playChime("start");

      // AI Reasoning Delay (1.3s - 1.8s)
      setTimeout(() => {
        // Randomly pick a smart follow-up probing their answer OR choose next high-quality question
        const isFollowUp = Math.random() > 0.45;
        let nextQ: AIInterviewQuestion;

        if (isFollowUp && currentQuestion) {
          nextQ = generateSmartFollowUp(answerText, currentQuestion.aiQuestion, resume);
        } else {
          nextQ = getNextInterviewQuestion(
            settings.targetRole,
            settings.roundType,
            resume,
            askedQuestionIds,
            turnCount
          );
        }

        setCurrentQuestion(nextQ);
        setAskedQuestionIds((prev) => [...prev, nextQ.id]);
        setTurnCount((prev) => prev + 1);

        // AI speaks the next question aloud!
        promptAiToSpeak(nextQ);
      }, 1400);
    },
    [
      askedQuestionIds,
      candidateLiveSpeech,
      currentQuestion,
      durationSeconds,
      formatCurrentTime,
      playChime,
      promptAiToSpeak,
      resume,
      settings.roundType,
      settings.targetRole,
      stopCandidateListening,
      turnCount,
    ]
  );

  // START LISTENING & INITIALIZE SPEECH RECOGNITION
  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window === "undefined") return;

    speechRecognitionRef.current = createCandidateSpeechRecognition(
      (transcribedText) => {
        setCandidateLiveSpeech(transcribedText);

        // Auto-silence timer: If candidate stops speaking for 3.2 seconds with a valid answer, submit
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (transcribedText.trim().length > 30) {
          silenceTimerRef.current = setTimeout(() => {
            handleSubmitCandidateAnswer(transcribedText);
          }, 3200);
        }
      },
      () => {
        // Voice activity detected: If AI was speaking and bargeInEnabled is true, execute barge-in
        if (settings.bargeInEnabled && orbState === "ai_speaking") {
          handleInterruptAI();
        }
      }
    );
  }, [handleInterruptAI, handleSubmitCandidateAnswer, orbState, settings.bargeInEnabled]);

  useEffect(() => {
    initializeSpeechRecognition();
    return () => {
      stopCandidateListening();
      if (aiCancelVoiceRef.current) {
        aiCancelVoiceRef.current();
      }
    };
  }, [initializeSpeechRecognition, stopCandidateListening]);

  // SIMULATE CANDIDATE ANSWER (FOR TESTING OR QUIET ENVIRONMENTS)
  const handleSimulateAnswer = useCallback(() => {
    if (orbState === "ai_speaking") {
      handleInterruptAI();
    }

    const answer =
      currentQuestion?.suggestedAnswer ||
      "We resolved this by sharding our PostgreSQL database by tenant ID and utilizing Redis for distributed locks with atomic SETNX.";

    setCandidateLiveSpeech(answer);
    setTimeout(() => {
      handleSubmitCandidateAnswer(answer);
    }, 600);
  }, [currentQuestion, handleInterruptAI, handleSubmitCandidateAnswer, orbState]);

  // PROMPT FOR NEXT RANDOM QUESTION IMMEDIATELY
  const handleAskNextQuestion = useCallback(() => {
    if (aiCancelVoiceRef.current) {
      aiCancelVoiceRef.current();
      aiCancelVoiceRef.current = null;
    }
    stopCandidateListening();

    const nextQ = getNextInterviewQuestion(
      settings.targetRole,
      settings.roundType,
      resume,
      askedQuestionIds,
      turnCount
    );

    setCurrentQuestion(nextQ);
    setAskedQuestionIds((prev) => [...prev, nextQ.id]);
    setTurnCount((prev) => prev + 1);

    promptAiToSpeak(nextQ);
  }, [
    askedQuestionIds,
    promptAiToSpeak,
    resume,
    settings.roundType,
    settings.targetRole,
    stopCandidateListening,
    turnCount,
  ]);

  // Update Settings
  const handleUpdateSettings = (newSettings: Partial<InterviewSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Launch interview from Pre-Flight
  const handleLaunchInterview = () => {
    playChime("start");
    setScreen("live");
    setTranscript([]);
    setDurationSeconds(0);

    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);

    // Pick first question (tailored from uploaded resume)
    const firstQ = getNextInterviewQuestion(
      settings.targetRole,
      settings.roundType,
      resume,
      [],
      0
    );

    setCurrentQuestion(firstQ);
    setAskedQuestionIds([firstQ.id]);
    setTurnCount(1);

    // AI immediately speaks the opening question!
    setTimeout(() => {
      promptAiToSpeak(firstQ);
    }, 500);
  };

  // End Interview Session
  const handleEndSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (aiCancelVoiceRef.current) {
      aiCancelVoiceRef.current();
      aiCancelVoiceRef.current = null;
    }
    stopCandidateListening();
    stopMic();
    playChime("complete");

    // Dynamically compute candidate performance diagnostics from session transcript
    const computedDiagnostics = calculateSessionDiagnostics(
      transcript,
      durationSeconds,
      settings.targetRole,
      settings.roundType,
      resume
    );

    setReportMetrics(computedDiagnostics);
    setScreen("report");
  };

  // Restart Interview to Setup
  const handleRestart = () => {
    if (aiCancelVoiceRef.current) {
      aiCancelVoiceRef.current();
      aiCancelVoiceRef.current = null;
    }
    stopCandidateListening();
    setDurationSeconds(0);
    setAiSpokenText("");
    setCandidateLiveSpeech("");
    setOrbState("idle");
    setScreen("setup");
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
      } else if (e.key === "Enter" && screen === "live" && orbState === "listening") {
        e.preventDefault();
        handleSubmitCandidateAnswer();
      } else if (e.key === "Enter" && screen === "setup") {
        e.preventDefault();
        handleLaunchInterview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInterruptAI, handleSubmitCandidateAnswer, orbState, screen, toggleMute]);

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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111815] hover:bg-black/5 transition-colors py-1.5 px-3.5 rounded-full bg-white border border-[#E5E0D0] shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MockPulse Neural Voice Engine v2.4</span>
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
                validationStatus={validationStatus}
                speechProgress={speechProgress}
                recordedAudioUrl={recordedAudioUrl}
                isPlayingPlayback={isPlayingPlayback}
                isAiSpeakingTest={isAiSpeakingTest}
                voiceClarityScore={voiceClarityScore}
                detectedSnrDb={detectedSnrDb}
                onPlayRecordedSample={playRecordedSample}
                onTestAiVoice={testAiVoice}
                autoOpenUpload={autoOpenUpload}
              />
            </motion.div>
          )}

          {/* 2. ACTIVE LIVE INTERVIEW SCREEN (Interactive AI Speaking & Candidate Listening) */}
          {screen === "live" && (
            <motion.div
              key="live-screen"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="w-full flex-1 flex flex-col items-center justify-between min-h-[calc(100vh-6.5rem)] max-w-4xl mx-auto"
            >
              <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 rounded-3xl bg-white border-2 border-[#111815] shadow-xl relative overflow-hidden space-y-6">
                {/* Ambient Warm Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />

                {/* Sub-Header inside Live Panel with Real-Time Telemetry */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E0D0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-[#111815]">
                      Active Voice Session
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-[11px] font-mono font-bold text-[#C24B1B]">
                      {settings.voiceModel.split(" ")[0]} ({settings.speed.toFixed(2)}x)
                    </span>
                    {settings.bargeInEnabled && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                        ⚡ Barge-in Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {currentQuestion && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FEF08A] text-[#713F12] border border-[#FDE047]">
                        Question {turnCount} • {currentQuestion.category}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-600 bg-[#FAF8EE] px-2.5 py-1 rounded-full border border-[#E5E0D0] shadow-xs">
                      <span>Mic:</span>
                      <strong className={isMuted ? "text-red-600" : "text-[#111815]"}>
                        {isMuted ? "MUTED" : `${micVolume}%`}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(true)}
                      className="px-2 py-1 rounded-full text-[10px] font-bold text-zinc-600 bg-white border border-[#E5E0D0] hover:bg-zinc-100 transition-colors cursor-pointer"
                      title="Adjust voice persona, speed, and microphone hardware"
                    >
                      Settings
                    </button>
                  </div>
                </div>

                {/* LIVE AI QUESTION SPEECH BUBBLE (Above Orb) */}
                <div className="relative z-20 min-h-[72px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {currentQuestion && (
                      <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl p-4 sm:p-5 rounded-2xl bg-[#FAF8EE] border-2 border-[#111815] shadow-md space-y-1.5 text-center sm:text-left"
                      >
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#111815]">
                          <Volume2 className="w-4 h-4 text-[#C24B1B] animate-pulse" />
                          <span>Interviewer AI:</span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            (Sub-600ms Neural Speech)
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#111815] font-semibold leading-relaxed">
                          {aiSpokenText || currentQuestion.aiQuestion}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CENTRAL MULTI-WAVE ANIMATED ORB VISUALIZER */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-2">
                  <OrbVisualizer
                    state={orbState}
                    micVolume={micVolume}
                    frequencyData={frequencyData}
                    onStateChange={setOrbState}
                    isMuted={isMuted}
                  />
                </div>

                {/* CANDIDATE LIVE SPEECH TRANSCRIPTION BUBBLE (Below Orb) */}
                <div className="relative z-20 min-h-[70px] flex items-center justify-center">
                  <AnimatePresence>
                    {orbState === "listening" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="w-full max-w-2xl p-4 rounded-2xl bg-[#F0FDF4] border-2 border-[#166534] shadow-md space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-[#166534]">
                          <div className="flex items-center gap-2">
                            <Mic className="w-4 h-4 text-[#166534] animate-bounce" />
                            <span>Candidate Speaking:</span>
                            <span className="text-[10px] font-mono text-zinc-600">
                              (Microphone Live • Speak your answer)
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSubmitCandidateAnswer()}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#166534] text-white text-[11px] font-bold hover:bg-[#14532d] transition-all cursor-pointer shadow-xs"
                          >
                            <span>Submit Answer</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm text-[#111815] font-medium italic min-h-[20px]">
                          {candidateLiveSpeech || (
                            <span className="text-zinc-400 not-italic">
                              Start speaking into your mic, or click &apos;Simulate Answer&apos; below...
                            </span>
                          )}
                        </p>
                      </motion.div>
                    )}

                    {orbState === "thinking" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3.5 rounded-2xl bg-[#F3E8FF] border border-[#E9D5FF] text-xs font-bold text-[#581C87] flex items-center gap-2 shadow-xs"
                      >
                        <Sparkles className="w-4 h-4 text-[#7E22CE] animate-spin" />
                        <span>AI is analyzing your technical trade-offs & formulating a follow-up probe...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* BOTTOM FLOATING DOCK CONTROLS */}
                <div className="relative z-20 pt-2">
                  <BottomDock
                    isMuted={isMuted}
                    onToggleMute={toggleMute}
                    onInterrupt={handleInterruptAI}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    orbState={orbState}
                    onSimulateAnswer={handleSimulateAnswer}
                    onAskNextQuestion={handleAskNextQuestion}
                    onSubmitCandidateAnswer={() => handleSubmitCandidateAnswer()}
                    hasSpokenText={candidateLiveSpeech.trim().length > 0}
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
