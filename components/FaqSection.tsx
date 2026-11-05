"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How is MockPulse different from other mock interview platforms?",
    answer:
      "MockPulse delivers a true conversational voice experience with sub-600ms latency. Unlike traditional text-based or slow turn-based simulators, MockPulse supports natural voice barge-ins (you can interrupt anytime), dynamic follow-up questioning based on your resume, and granular telemetry on your speaking pace, filler words, and technical depth.",
  },
  {
    id: "faq-2",
    question: "Is there a free trial available for MockPulse's AI interviews?",
    answer:
      "Yes! You can complete full technical rounds for free without entering a credit card. Free sessions include complete live audio streaming, code architecture probes, and immediate circular rubric scoring.",
  },
  {
    id: "faq-3",
    question: "Who should use MockPulse's AI interview coaching?",
    answer:
      "MockPulse is built for software engineers of all tiers—from students and boot camp grads preparing for their first junior role, to senior and staff engineers preparing for high-stakes system design and behavioral rounds at top-tier tech companies.",
  },
  {
    id: "faq-4",
    question: "What is the typical length of an AI interview session?",
    answer:
      "Sessions typically run between 15 to 35 minutes depending on the selected difficulty and round type. You can also pause, fast-forward, or conclude the session early to generate an instant diagnostic report.",
  },
  {
    id: "faq-5",
    question: "How does MockPulse AI analyze my responses and provide feedback?",
    answer:
      "During the call, MockPulse listens to your technical clarity, structure (such as STAR framework), and conversational pacing. Upon concluding, it generates circular progress rings, highlights specific trade-offs you handled well, flags 2 actionable growth areas, and exports a full timestamped transcript.",
  },
  {
    id: "faq-6",
    question: "Can I customize my interview experience for different job roles?",
    answer:
      "Absolutely. You can tailor your interview for Full-Stack, React Frontend, Node.js Backend, AI/ML Infrastructure, Cloud & DevOps, or Distributed Systems. You can also upload your actual resume to steer questions directly toward your past projects.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto px-4 py-16 sm:py-24 space-y-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Ask Question
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111815]">
          Frequently asked questions
        </h2>
        <p className="text-sm text-zinc-600 max-w-lg">
          Everything you need to know about MockPulse&apos;s real-time AI voice interview platform.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#F3E8FF] border border-[#E9D5FF] shadow-sm"
                  : "bg-white/80 hover:bg-white border border-[#E5E0D0]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span
                  className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? "text-[#581C87]" : "text-[#111815]"
                  }`}
                >
                  {item.question}
                </span>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen
                      ? "bg-[#E9D5FF] text-[#581C87]"
                      : "bg-[#F4F1E4] text-[#111815]"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4A154B] leading-relaxed border-t border-[#E9D5FF]/60">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

