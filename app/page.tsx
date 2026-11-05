"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Mic,
  Volume2,
  FileText,
  Zap,
  Play,
  Layers,
  Award,
  Shield,
  Activity,
  Menu,
  X,
} from "lucide-react";
import {
  LinedPaperDoodleLeft,
  LinedPaperDoodleRight,
  CurlySketchArrow,
} from "../components/SketchDoodles";
import { HeroShowcase } from "../components/HeroShowcase";
import { TerracottaSection } from "../components/TerracottaSection";
import { FaqSection } from "../components/FaqSection";
import { PreFooterBanner, LandingFooter } from "../components/LandingFooter";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8EE] text-[#111815] selection:bg-yellow-200 selection:text-black">
      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 w-full bg-[#FAF8EE]/90 backdrop-blur-md border-b border-[#E5E0D0] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#FEF08A] border-2 border-[#111815] flex items-center justify-center text-[#111815] font-black text-lg group-hover:scale-105 transition-transform shadow-xs">
              M
            </div>
            <span className="font-black text-xl tracking-tight text-[#111815]">
              MockPulse
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold text-[#111815]/80">
            <Link
              href="/interview"
              className="hover:text-[#111815] transition-colors flex items-center gap-1.5"
            >
              <span>Voice Agent</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                LIVE
              </span>
            </Link>
            <a href="#features" className="hover:text-[#111815] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#111815] transition-colors">
              Pricing
            </a>
            <a href="#students" className="hover:text-[#111815] transition-colors">
              For Students
            </a>
            <a href="#faq" className="hover:text-[#111815] transition-colors">
              FAQ
            </a>
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/interview"
              className="px-4 py-2 text-xs font-bold text-[#111815] hover:bg-black/5 rounded-full border border-[#111815]/30 transition-colors"
            >
              Log In
            </Link>

            <Link
              href="/interview"
              className="px-5 py-2.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Start Free Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#111815] hover:bg-black/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-[#FAF8EE] border-b border-[#E5E0D0] space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-bold text-[#111815]">
              <Link
                href="/interview"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-black/5 flex items-center justify-between"
              >
                <span>Voice Agent</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Live
                </span>
              </Link>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-black/5"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-black/5"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-black/5"
              >
                FAQ
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/interview"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-[#111815] text-white text-xs font-bold"
              >
                Start Free Interview
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative w-full pt-10 sm:pt-16 pb-16 px-4 sm:px-6 bg-hero-grid overflow-hidden">
        {/* Floating Sketch Doodles on Left and Right (matching reference aesthetic!) */}
        <div className="hidden lg:block absolute left-4 xl:left-12 top-28 z-10">
          <LinedPaperDoodleLeft />
        </div>
        <div className="hidden lg:block absolute left-8 xl:left-16 top-[370px] z-10">
          <LinedPaperDoodleRight />
        </div>
        <div className="hidden lg:block absolute right-6 xl:right-16 top-32 z-10">
          <LinedPaperDoodleRight />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 relative z-20">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111815] text-white text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Sub-Second Latency Voice AI</span>
          </div>

          {/* Main Headline with Highlighter Marker */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-[#111815] leading-[1.08] max-w-3xl">
            AI Interviewer to get your dream{" "}
            <span className="highlighter-marker text-[#111815] px-1">
              tech job.
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg text-[#111815]/75 max-w-2xl leading-relaxed font-medium">
            Practice real-time conversational technical interviews with sub-second voice latency.
            Handle dynamic follow-ups, test system architecture, and get instant diagnostic reports
            tailored to your resume.
          </p>

          {/* Dual Pill CTA Buttons with Curly Sketch Arrow */}
          <div className="relative pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            {/* Curly Hand-drawn Arrow pointing to CTA */}
            <div className="hidden sm:block absolute -left-20 -top-8 pointer-events-none">
              <CurlySketchArrow />
            </div>

            <Link
              href="/interview"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Practice For Free — Try Now!</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/interview"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border-2 border-[#111815] hover:bg-[#111815]/5 text-[#111815] font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Upload Resume</span>
            </Link>
          </div>

          {/* Social Proof: Trusted by engineers at */}
          <div className="pt-6 sm:pt-8 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-mono">
              Trusted by Candidates & Engineers from:
            </span>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-9 text-zinc-600 font-bold text-sm sm:text-base tracking-tight opacity-75">
              <span className="hover:opacity-100 transition-opacity">stripe</span>
              <span className="hover:opacity-100 transition-opacity">HubSpot</span>
              <span className="hover:opacity-100 transition-opacity">coinbase</span>
              <span className="hover:opacity-100 transition-opacity">Google</span>
              <span className="hover:opacity-100 transition-opacity">Meta</span>
              <span className="hover:opacity-100 transition-opacity">Amazon</span>
            </div>
          </div>

          {/* Hero Showcase Video / Demo Player with Terracotta Frame */}
          <HeroShowcase />
        </div>
      </section>

      {/* 3. TERRACOTTA BAND: CHALLENGES IN INTERVIEW PREP */}
      <div id="features">
        <TerracottaSection />
      </div>

      {/* 4. TECHNICAL CAPABILITIES HIGHLIGHTS */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-14">
        <div className="flex flex-col items-center text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF08A] text-[#713F12] border border-[#FDE047] uppercase font-mono">
            Engineering Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111815] tracking-tight">
            How MockPulse simulates real senior interviews
          </h2>
          <p className="text-sm text-zinc-600 max-w-lg">
            Built from real engineering loops at top tech firms to probe critical thinking and trade-off justification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D0] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FEF08A] flex items-center justify-center text-[#111815]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111815]">Sub-600ms Voice Latency</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Powered by real-time WebRTC audio edge inference. Speak, pause, or interrupt with immediate neural turnaround.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D0] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#581C87]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111815]">Automated Resume Entity Ingestion</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Drop your PDF. MockPulse extracts past distributed systems, microservices, and database projects to craft custom probes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D0] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#CCFBF1] flex items-center justify-center text-[#115E59]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111815]">Diagnostic Performance Scoring</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Receive precise circular progress scores across Technical Clarity, Communication Pacing, Answer Depth, and Filler Word frequency.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION SECTION */}
      <FaqSection />

      {/* 6. PRE-FOOTER BANNER & MINIMALIST FOOTER */}
      <PreFooterBanner />
      <LandingFooter />
    </div>
  );
}
