"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Send, Sparkles } from "lucide-react";
import { CareerLadderGraphic } from "./SketchDoodles";

export function PreFooterBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
      <div className="relative rounded-3xl bg-[#FEF08A] border-2 border-[#111815] p-8 sm:p-12 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left copy */}
        <div className="space-y-4 max-w-xl text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111815] text-[#FEF08A] text-xs font-bold tracking-wide uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for your dream offer?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111815] leading-tight">
            Ace your next technical interview.
          </h2>

          <p className="text-sm sm:text-base text-[#422006] font-medium leading-relaxed">
            Practice realistic voice rounds with our AI interviewer platform. Get personalized feedback, identify weak spots, and walk into your dream company with total confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Link
              href="/interview"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Practice For Free Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-xs text-[#5c2b07] font-semibold">
              No credit card required • Instant mic calibration
            </span>
          </div>
        </div>

        {/* Right illustrative graphic */}
        <div className="shrink-0 flex items-center justify-center relative">
          <div className="scale-110 sm:scale-125 transform">
            <CareerLadderGraphic />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#FAF8EE] border-t border-[#E5E0D0] pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top row: Brand & Newsletter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-[#E5E0D0]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF08A] border-2 border-[#111815] flex items-center justify-center text-[#111815] font-black text-xl shadow-xs">
              M
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#111815]">
                MockPulse
              </span>
              <p className="text-[11px] text-zinc-500 font-medium">Real-Time Voice Mock Interviews</p>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-bold text-[#111815] whitespace-nowrap">
              Sign up to our newsletter
            </span>

            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-xs font-semibold text-[#166534]">
                <Check className="w-4 h-4" />
                <span>You&apos;re on the early access list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="px-4 py-2 text-xs rounded-l-full border border-r-0 border-[#111815] bg-white text-[#111815] placeholder-zinc-400 focus:outline-none w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-r-full bg-[#111815] text-white hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle sub-row: Terms, Privacy, Support, Socials */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#111815] transition-colors">Terms of Use</a>
            <span className="text-zinc-300">•</span>
            <a href="#" className="hover:text-[#111815] transition-colors">Privacy Policy</a>
            <span className="text-zinc-300">•</span>
            <a href="mailto:support@mockpulse.ai" className="hover:text-[#111815] transition-colors">
              support@mockpulse.ai
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#111815] transition-colors font-semibold">
              in / LinkedIn
            </a>
            <span className="text-zinc-300">•</span>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#111815] transition-colors font-semibold">
              𝕏 / Twitter
            </a>
            <span className="text-zinc-300">•</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#111815] transition-colors font-semibold">
              GitHub
            </a>
          </div>
        </div>

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-y border-[#E5E0D0] text-xs">
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-[#111815] font-mono text-[11px]">
              Company
            </h4>
            <ul className="space-y-2 text-zinc-600 font-medium">
              <li><a href="#" className="hover:text-[#111815] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#111815] transition-colors">Engineering Careers</a></li>
              <li><a href="#" className="hover:text-[#111815] transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-[#111815] transition-colors">Campus Ambassadors</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-[#111815] font-mono text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2 text-zinc-600 font-medium">
              <li><Link href="/interview" className="hover:text-[#111815] transition-colors">Live Voice Agent</Link></li>
              <li><a href="#features" className="hover:text-[#111815] transition-colors">Resume Entity Ingestion</a></li>
              <li><a href="#features" className="hover:text-[#111815] transition-colors">Sub-600ms Latency Engine</a></li>
              <li><a href="#faq" className="hover:text-[#111815] transition-colors">Audio Diagnostic Rubric</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-[#111815] font-mono text-[11px]">
              Engineering Tracks
            </h4>
            <ul className="space-y-2 text-zinc-600 font-medium">
              <li><Link href="/interview" className="hover:text-[#111815] transition-colors">Full-Stack Engineer</Link></li>
              <li><Link href="/interview" className="hover:text-[#111815] transition-colors">Frontend React / Next.js</Link></li>
              <li><Link href="/interview" className="hover:text-[#111815] transition-colors">Backend Node.js & Go</Link></li>
              <li><Link href="/interview" className="hover:text-[#111815] transition-colors">Distributed System Design</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-[#111815] font-mono text-[11px]">
              For Organizations
            </h4>
            <ul className="space-y-2 text-zinc-600 font-medium">
              <li><a href="#" className="hover:text-[#111815] transition-colors">University Bootcamps</a></li>
              <li><a href="#" className="hover:text-[#111815] transition-colors">Enterprise Hiring ATS</a></li>
              <li><a href="#" className="hover:text-[#111815] transition-colors">Custom Scoring Rubrics</a></li>
              <li><a href="#" className="hover:text-[#111815] transition-colors">Security & SOC2 Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Oversized Brand Typography Watermark at bottom */}
        <div className="pt-4 select-none pointer-events-none overflow-hidden flex justify-center items-center">
          <span className="text-[18vw] font-black tracking-tighter text-[#111815] leading-none opacity-95 text-center">
            MockPulse
          </span>
        </div>
      </div>
    </footer>
  );
}

