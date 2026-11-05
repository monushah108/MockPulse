"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  Mic,
  Search,
  Sparkles,
  Bot,
  User,
  ArrowDown,
  Tag,
  Clock,
  Zap,
} from "lucide-react";
import { TranscriptItem, QuestionCategory } from "../types/interview";

interface TranscriptPanelProps {
  transcript: TranscriptItem[];
  isAiSpeaking: boolean;
  isCandidateSpeaking: boolean;
  streamingText?: string;
  streamingSpeaker?: "ai" | "candidate";
}

export function TranscriptPanel({
  transcript,
  isAiSpeaking,
  isCandidateSpeaking,
  streamingText,
  streamingSpeaker,
}: TranscriptPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new transcript items or streaming text arrive
  useEffect(() => {
    if (autoScroll && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [transcript, streamingText, autoScroll]);

  // Handle user scrolling
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 60;
    setAutoScroll(isAtBottom);
  };

  const filteredTranscript = transcript.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryBadgeClass = (category?: QuestionCategory) => {
    switch (category) {
      case "Algorithm":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Architecture":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Behavioral":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "System Design":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "Coding":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#18181b]/50 rounded-2xl border border-[#27272a] overflow-hidden">
      {/* Header bar: Search filter + Auto-scroll toggle */}
      <div className="p-3 border-b border-[#27272a] bg-[#121215]/80 flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/80 transition-colors"
          />
        </div>

        {!autoScroll && (
          <button
            type="button"
            onClick={() => {
              setAutoScroll(true);
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600/80 hover:bg-indigo-500 text-white text-[11px] font-medium shadow transition-colors"
          >
            <ArrowDown className="w-3 h-3" />
            <span>Scroll to Live</span>
          </button>
        )}
      </div>

      {/* Main Transcript Message List */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence initial={false}>
          {filteredTranscript.map((item) => {
            const isAI = item.speaker === "ai";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col gap-1.5 ${
                  isAI ? "items-start" : "items-end"
                }`}
              >
                {/* Speaker Header with category badge & timestamp */}
                <div className="flex items-center gap-2 text-[11px]">
                  {isAI ? (
                    <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                      <div className="w-5 h-5 rounded-md bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span>Interviewer AI</span>
                      {isAiSpeaking && (
                        <span className="flex items-center gap-0.5 ml-1">
                          <span className="w-1 h-2 rounded-full bg-indigo-400 animate-pulse" />
                          <span className="w-1 h-3 rounded-full bg-indigo-400 animate-pulse delay-75" />
                          <span className="w-1 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-150" />
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                      {isCandidateSpeaking && (
                        <span className="flex items-center gap-0.5 mr-1">
                          <span className="w-1 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                          <span className="w-1 h-3 rounded-full bg-sky-400 animate-pulse delay-75" />
                          <span className="w-1 h-2 rounded-full bg-sky-400 animate-pulse delay-150" />
                        </span>
                      )}
                      <span>Candidate</span>
                      <div className="w-5 h-5 rounded-md bg-sky-500/15 border border-sky-500/25 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                    </div>
                  )}

                  {/* Category Pill */}
                  {item.category && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  )}

                  <span className="text-zinc-500 text-[10px] font-mono flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.timestamp}
                  </span>
                </div>

                {/* Message Bubble Card */}
                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isAI
                      ? "bg-zinc-900/90 text-zinc-100 border border-zinc-800 rounded-tl-sm shadow-sm"
                      : "bg-indigo-950/40 text-indigo-100 border border-indigo-500/30 rounded-tr-sm shadow-sm"
                  }`}
                >
                  <p>{item.text}</p>

                  {/* Feedback Tags / Telemetry pills */}
                  {item.feedbackTags && item.feedbackTags.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                      {item.feedbackTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.latencyMs && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-950/60 text-sky-300 border border-sky-800/40 flex items-center gap-1 ml-auto">
                          <Zap className="w-2.5 h-2.5 fill-sky-400" />
                          {item.latencyMs}ms
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Live Word-by-Word Streaming Bubble if an utterance is actively streaming */}
        {streamingText && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col gap-1.5 ${
              streamingSpeaker === "ai" ? "items-start" : "items-end"
            }`}
          >
            <div className="flex items-center gap-2 text-[11px]">
              {streamingSpeaker === "ai" ? (
                <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <div className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span>Interviewer AI</span>
                  <span className="text-[10px] text-indigo-400/80 animate-pulse">Streaming...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <span className="text-[10px] text-sky-400/80 animate-pulse">Transcribing...</span>
                  <span>Candidate</span>
                  <div className="w-5 h-5 rounded-md bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>
              )}
            </div>

            <div
              className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed border ${
                streamingSpeaker === "ai"
                  ? "bg-zinc-900 text-zinc-100 border-indigo-500/40 shadow-lg shadow-indigo-950/20"
                  : "bg-indigo-950/50 text-indigo-100 border-sky-500/40 shadow-lg shadow-sky-950/20"
              }`}
            >
              <p>
                {streamingText}
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-indigo-400 animate-pulse" />
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="px-4 py-2 border-t border-[#27272a] bg-[#121215]/90 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <span>{transcript.length} turns recorded</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Real-time Whisper ASR stream
        </span>
      </div>
    </div>
  );
}

