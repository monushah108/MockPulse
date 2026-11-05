"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bot,
  User,
  ArrowDown,
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

  const filteredTranscript = transcript.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryBadgeClass = (category?: QuestionCategory) => {
    switch (category) {
      case "Algorithm":
        return "bg-[#FEF08A] text-[#713F12] border-[#FDE047]";
      case "Architecture":
        return "bg-[#FFEDD5] text-[#C24B1B] border-[#FDBA74]";
      case "Behavioral":
        return "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]";
      case "System Design":
        return "bg-[#F3E8FF] text-[#581C87] border-[#E9D5FF]";
      case "Coding":
        return "bg-[#CCFBF1] text-[#115E59] border-[#99F6E4]";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border-2 border-[#111815] overflow-hidden shadow-sm">
      {/* Header bar: Search filter + Auto-scroll toggle */}
      <div className="p-3 border-b border-[#E5E0D0] bg-[#FAF8EE] flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#E5E0D0] text-xs text-[#111815] placeholder-zinc-400 font-medium focus:outline-none focus:border-[#111815] transition-colors"
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
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowDown className="w-3 h-3" />
            <span>Scroll Live</span>
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
                    <div className="flex items-center gap-1.5 text-[#C24B1B] font-extrabold">
                      <div className="w-5 h-5 rounded-md bg-[#FFEDD5] border border-[#FDBA74] flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-[#C24B1B]" />
                      </div>
                      <span>Interviewer AI</span>
                      {isAiSpeaking && (
                        <span className="flex items-center gap-0.5 ml-1">
                          <span className="w-1 h-2 rounded-full bg-[#C24B1B] animate-pulse" />
                          <span className="w-1 h-3 rounded-full bg-[#C24B1B] animate-pulse delay-75" />
                          <span className="w-1 h-1.5 rounded-full bg-[#C24B1B] animate-pulse delay-150" />
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[#0F766E] font-extrabold">
                      {isCandidateSpeaking && (
                        <span className="flex items-center gap-0.5 mr-1">
                          <span className="w-1 h-1.5 rounded-full bg-[#0F766E] animate-pulse" />
                          <span className="w-1 h-3 rounded-full bg-[#0F766E] animate-pulse delay-75" />
                          <span className="w-1 h-2 rounded-full bg-[#0F766E] animate-pulse delay-150" />
                        </span>
                      )}
                      <span>Candidate</span>
                      <div className="w-5 h-5 rounded-md bg-[#CCFBF1] border border-[#99F6E4] flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-[#0F766E]" />
                      </div>
                    </div>
                  )}

                  {/* Category Pill */}
                  {item.category && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getCategoryBadgeClass(
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
                      ? "bg-[#FAF8EE] text-[#111815] border border-[#E5E0D0] rounded-tl-xs shadow-xs font-medium"
                      : "bg-[#F3E8FF] text-[#3B0764] border border-[#E9D5FF] rounded-tr-xs shadow-xs font-medium"
                  }`}
                >
                  <p>{item.text}</p>

                  {/* Feedback Tags / Telemetry pills */}
                  {item.feedbackTags && item.feedbackTags.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-black/10 flex flex-wrap items-center gap-1.5">
                      {item.feedbackTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 text-[#111815] border border-black/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.latencyMs && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] flex items-center gap-1 ml-auto">
                          <Zap className="w-2.5 h-2.5 fill-[#166534]" />
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

        {/* Live Word-by-Word Streaming Bubble */}
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
                <div className="flex items-center gap-1.5 text-[#C24B1B] font-extrabold">
                  <div className="w-5 h-5 rounded-md bg-[#FFEDD5] border border-[#FDBA74] flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-[#C24B1B]" />
                  </div>
                  <span>Interviewer AI</span>
                  <span className="text-[10px] text-[#C24B1B] font-bold animate-pulse">
                    Streaming...
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#0F766E] font-extrabold">
                  <span className="text-[10px] text-[#0F766E] font-bold animate-pulse">
                    Transcribing...
                  </span>
                  <span>Candidate</span>
                  <div className="w-5 h-5 rounded-md bg-[#CCFBF1] border border-[#99F6E4] flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-[#0F766E]" />
                  </div>
                </div>
              )}
            </div>

            <div
              className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed border-2 ${
                streamingSpeaker === "ai"
                  ? "bg-[#FAF8EE] text-[#111815] border-[#C24B1B] shadow-md"
                  : "bg-[#F3E8FF] text-[#3B0764] border-[#7E22CE] shadow-md"
              }`}
            >
              <p>
                {streamingText}
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#C24B1B] animate-pulse" />
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="px-4 py-2 border-t border-[#E5E0D0] bg-[#FAF8EE] flex items-center justify-between text-[11px] text-zinc-600 font-mono font-medium">
        <span>{transcript.length} turns recorded</span>
        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Real-Time Neural ASR Stream
        </span>
      </div>
    </div>
  );
}
