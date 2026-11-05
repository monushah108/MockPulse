"use client";

import React from "react";
import {
  Zap,
  FileSearch,
  Hand,
  TrendingUp,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { StickyPaperclip } from "./SketchDoodles";

export function TerracottaSection() {
  const cards = [
    {
      id: "card-1",
      title: "Zero-Latency Voice",
      badge: "Sub-600ms Speed",
      description:
        "No robotic pauses or awkward silences. Real-time streaming mimics organic human conversational cadence, testing your spontaneous thinking under pressure.",
      bg: "bg-[#FEF08A]", // Soft pastel yellow
      border: "border-[#FDE047]",
      textTitle: "text-[#713F12]",
      textBody: "text-[#854D0E]",
      tilt: "-rotate-2 sm:-rotate-3 hover:rotate-0",
      icon: <Zap className="w-5 h-5 text-[#854D0E]" />,
    },
    {
      id: "card-2",
      title: "Resume Deep Dive",
      badge: "Project Probing",
      description:
        "MockPulse reads your uploaded projects and tech stacks. Instead of generic trivia, expect targeted inquiries into your CRDT sync, Postgres locks, or Docker clusters.",
      bg: "bg-[#F3E8FF]", // Soft pastel lavender
      border: "border-[#E9D5FF]",
      textTitle: "text-[#581C87]",
      textBody: "text-[#6B21A8]",
      tilt: "rotate-2 sm:rotate-3 hover:rotate-0",
      icon: <FileSearch className="w-5 h-5 text-[#6B21A8]" />,
    },
    {
      id: "card-3",
      title: "Dynamic Interruptions",
      badge: "Full Barge-In",
      description:
        "Real interviews aren't monologues. Interrupt the AI mid-sentence to clarify scope, propose alternative architectures, or pivot away from edge-case bottlenecks.",
      bg: "bg-[#CCFBF1]", // Soft pastel mint
      border: "border-[#99F6E4]",
      textTitle: "text-[#115E59]",
      textBody: "text-[#0F766E]",
      tilt: "rotate-1 sm:rotate-2 hover:rotate-0",
      icon: <Hand className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      id: "card-4",
      title: "Instant Diagnostic Scoring",
      badge: "Actionable Rubric",
      description:
        "Circular progress scores for technical clarity, answer depth, and communication pacing. Review detected filler words, WPM, and download your transcript.",
      bg: "bg-[#DCFCE7]", // Soft pastel green
      border: "border-[#BBF7D0]",
      textTitle: "text-[#14532D]",
      textBody: "text-[#166534]",
      tilt: "-rotate-1 sm:-rotate-2 hover:rotate-0",
      icon: <TrendingUp className="w-5 h-5 text-[#166534]" />,
    },
  ];

  return (
    <section className="w-full bg-[#C24B1B] text-white py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold tracking-wide text-white uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Career Preparation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl">
            Common Challenges in Interview Prep
          </h2>

          <p className="text-white/85 text-sm sm:text-base max-w-xl">
            Traditional prep tools fail to replicate the pressure and conversational flow of a real technical round. MockPulse bridges the gap.
          </p>
        </div>

        {/* 4 Tilted Sticky Note Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 pt-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative ${card.bg} ${card.border} border rounded-2xl p-6 shadow-sticky transition-transform duration-300 transform ${card.tilt} flex flex-col justify-between min-h-[260px] group cursor-default`}
            >
              {/* Top tape strip */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                <StickyPaperclip />
              </div>

              {/* Card Header */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/70 flex items-center justify-center shadow-xs">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-[#111815]">
                    {card.badge}
                  </span>
                </div>

                <h3 className={`text-lg font-extrabold tracking-tight ${card.textTitle}`}>
                  {card.title}
                </h3>

                <p className={`text-xs leading-relaxed ${card.textBody} font-medium`}>
                  {card.description}
                </p>
              </div>

              {/* Card Footer Micro CTA */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-tight text-[#111815] group-hover:underline">
                  Voice Agent Ready
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#111815] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note & CTA inside Terracotta */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/20 text-center sm:text-left">
          <p className="text-white/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Transform your engineering interview performance with our real-time voice platform. Every practice session provides sub-second conversational feedback and builds total confidence.
          </p>

          <Link
            href="/interview"
            className="shrink-0 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-[#111815] font-bold text-xs sm:text-sm shadow-xl transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Start Practice Round</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

