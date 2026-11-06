"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Mail,
  ExternalLink,
  X,
  Briefcase,
  Users,
  Building,
  CheckCircle2,
  Newspaper,
  GraduationCap,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CareerLadderGraphic } from "./SketchDoodles";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
  const [activeModal, setActiveModal] = useState<
    "about" | "careers" | "press" | "ambassadors" | "enterprise" | "rubrics" | null
  >(null);

  return (
    <>
      <footer className="w-full bg-[#FAF8EE] border-t border-[#E5E0D0] pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top row: Brand & Direct Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-[#E5E0D0]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF08A] border-2 border-[#111815] flex items-center justify-center text-[#111815] font-black text-xl shadow-xs">
                M
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-[#111815]">
                  MockPulse
                </span>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Real-Time Voice Mock Interviews • Sub-600ms Neural Engine
                </p>
              </div>
            </div>

            {/* Quick Voice Studio CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/interview"
                className="px-5 py-2.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <span>Launch Voice Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Middle sub-row: Terms, Privacy, Support, User Socials */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600 font-medium">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/terms" className="hover:text-[#111815] transition-colors">
                Terms of Use
              </Link>
              <span className="text-zinc-300">•</span>
              <Link href="/privacy" className="hover:text-[#111815] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-zinc-300">•</span>
              <a
                href="mailto:sonuk627422@gmail.com"
                className="hover:text-[#111815] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span>sonuk627422@gmail.com</span>
              </a>
            </div>

            {/* Direct Working Personal Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/monushah108"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E0D0] text-[#111815] hover:border-[#111815] hover:bg-[#111815] hover:text-white transition-all shadow-xs text-xs font-bold cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/monushah108"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E0D0] text-[#111815] hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all shadow-xs text-xs font-bold cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://x.com/monushah108"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E0D0] text-[#111815] hover:border-black hover:bg-black hover:text-white transition-all shadow-xs text-xs font-bold cursor-pointer"
              >
                <XIcon className="w-3.5 h-3.5" />
                <span>𝕏 / Twitter</span>
              </a>
            </div>
          </div>

          {/* Creator Attribution & Tech Specs Bar */}
          <div className="pt-6 border-t border-[#E5E0D0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Designed & Engineered from scratch by <strong className="text-[#111815]">Monu Shah</strong> (
                <a
                  href="https://github.com/monushah108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#C24B1B] font-bold"
                >
                  @monushah108
                </a>
                )
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
              <span>Next.js 16 • React 19 • Web Audio API</span>
              <span>•</span>
              <span>MIT License</span>
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

      {/* INTERACTIVE MODALS FOR ALL WORKING FOOTER LINKS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              className="w-full max-w-xl bg-[#FAF8EE] rounded-3xl border-2 border-[#111815] shadow-2xl p-6 sm:p-8 space-y-6 text-[#111815] max-h-[85vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#111815]" />
              </button>

              {/* MODAL 1: ABOUT US */}
              {activeModal === "about" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#713F12] border border-[#FDE047] text-xs font-bold font-mono">
                    <Users className="w-3.5 h-3.5" />
                    <span>Company Story</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">About MockPulse</h3>
                  <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                    MockPulse was founded by Monu Shah (@monushah108) with a singular mission: to make world-class technical interview preparation accessible to every software engineer without high hourly coaching fees or scheduling bottlenecks.
                  </p>
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E0D0] space-y-2 text-xs">
                    <h5 className="font-bold text-[#111815]">Our Technical Philosophy:</h5>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-600">
                      <li>Sub-600ms latency: Real-time conversational barge-in replicating human dynamics.</li>
                      <li>Resume entity extraction: Contextual questions tailored to candidate GitHub & microservices.</li>
                      <li>Objective diagnostic rubric: Zero bias, measuring technical depth and speech pacing.</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500 font-mono">Founder: Monu Shah • Delhi NCR</span>
                    <a
                      href="mailto:sonuk627422@gmail.com"
                      className="px-4 py-2 rounded-full bg-[#111815] text-white text-xs font-bold hover:bg-[#202e26]"
                    >
                      Contact Monu
                    </a>
                  </div>
                </div>
              )}

              {/* MODAL 2: ENGINEERING CAREERS */}
              {activeModal === "careers" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-xs font-bold font-mono">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>We&apos;re Hiring Engineers</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Engineering Careers</h3>
                  <p className="text-sm text-zinc-700 font-medium">
                    Build real-time WebRTC audio edge inference and distributed AI interview agents alongside us.
                  </p>
                  <div className="space-y-2.5 pt-1 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-[#E5E0D0] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#111815]">Senior Voice AI & WebRTC Engineer</span>
                        <p className="text-zinc-500 text-[11px]">Edge audio pipelines, VAD models, Web Audio API • Remote</p>
                      </div>
                      <a
                        href="mailto:sonuk627422@gmail.com?subject=Application%20for%20Senior%20Voice%20AI%20Engineer"
                        className="px-3 py-1.5 rounded-full bg-[#111815] text-white font-bold text-[11px] hover:bg-[#202e26]"
                      >
                        Apply
                      </a>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#E5E0D0] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#111815]">Full-Stack Next.js 15 & React 19 Developer</span>
                        <p className="text-zinc-500 text-[11px]">TypeScript, Tailwind CSS, high-concurrency UI • Remote</p>
                      </div>
                      <a
                        href="mailto:sonuk627422@gmail.com?subject=Application%20for%20Full-Stack%20Developer"
                        className="px-3 py-1.5 rounded-full bg-[#111815] text-white font-bold text-[11px] hover:bg-[#202e26]"
                      >
                        Apply
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 3: PRESS & MEDIA */}
              {activeModal === "press" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#713F12] border border-[#FDE047] text-xs font-bold font-mono">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>Media Kit</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Press & Media Kit</h3>
                  <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                    MockPulse is redefining career readiness through neural voice agents capable of conversational interruptions and resume entity analysis.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1 text-center text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D0]">
                      <span className="block text-xl font-black text-[#111815]">580ms</span>
                      <span className="text-zinc-500 text-[11px]">Average Voice Latency</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D0]">
                      <span className="block text-xl font-black text-[#111815]">94%</span>
                      <span className="text-zinc-500 text-[11px]">Candidate Offer Alignment</span>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Press Contact: sonuk627422@gmail.com</span>
                    <a
                      href="mailto:sonuk627422@gmail.com?subject=Press%20Inquiry%20-%20MockPulse"
                      className="px-4 py-2 rounded-full bg-[#111815] text-white text-xs font-bold"
                    >
                      Email Press Team
                    </a>
                  </div>
                </div>
              )}

              {/* MODAL 4: CAMPUS AMBASSADORS */}
              {activeModal === "ambassadors" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3E8FF] text-[#581C87] border border-[#E9D5FF] text-xs font-bold font-mono">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>University Network</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Campus Ambassador Program</h3>
                  <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                    Represent MockPulse at your university or coding bootcamp. Empower students to prepare for high-stakes tech placement drives.
                  </p>
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E0D0] space-y-2 text-xs">
                    <h5 className="font-bold text-[#111815]">Ambassador Perks:</h5>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-600">
                      <li>Free unlimited MockPulse sessions for yourself.</li>
                      <li>Discount codes & workshop slide kits for your computer science club.</li>
                      <li>Official Certificate of Leadership signed by the engineering team.</li>
                    </ul>
                  </div>
                  <a
                    href="mailto:sonuk627422@gmail.com?subject=Campus%20Ambassador%20Application"
                    className="w-full py-2.5 rounded-full bg-[#111815] text-white text-xs font-bold text-center block hover:bg-[#202e26]"
                  >
                    Apply as Campus Ambassador
                  </a>
                </div>
              )}

              {/* MODAL 5: ENTERPRISE HIRING ATS */}
              {activeModal === "enterprise" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-xs font-bold font-mono">
                    <Building className="w-3.5 h-3.5" />
                    <span>Organizations & ATS</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Enterprise ATS Integrations</h3>
                  <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                    Pre-screen thousands of engineering applicants with automated 15-minute voice rounds delivered directly into your hiring pipeline.
                  </p>
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E0D0] space-y-2 text-xs">
                    <h5 className="font-bold text-[#111815]">Supported ATS Connectors:</h5>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-md bg-zinc-100 font-mono font-bold text-[#111815]">Greenhouse</span>
                      <span className="px-2.5 py-1 rounded-md bg-zinc-100 font-mono font-bold text-[#111815]">Lever</span>
                      <span className="px-2.5 py-1 rounded-md bg-zinc-100 font-mono font-bold text-[#111815]">Ashby</span>
                      <span className="px-2.5 py-1 rounded-md bg-zinc-100 font-mono font-bold text-[#111815]">Workday</span>
                    </div>
                  </div>
                  <a
                    href="mailto:sonuk627422@gmail.com?subject=Enterprise%20ATS%20Demo%20Request"
                    className="w-full py-2.5 rounded-full bg-[#111815] text-white text-xs font-bold text-center block hover:bg-[#202e26]"
                  >
                    Request Enterprise Pilot & Webhook Specs
                  </a>
                </div>
              )}

              {/* MODAL 6: CUSTOM SCORING RUBRICS */}
              {activeModal === "rubrics" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#713F12] border border-[#FDE047] text-xs font-bold font-mono">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Evaluation Matrix</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Custom Scoring Rubrics</h3>
                  <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                    MockPulse scores candidate responses across 4 standardized engineering dimensions:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D0] space-y-1">
                      <span className="font-bold text-[#111815]">1. Technical Clarity</span>
                      <p className="text-zinc-500 text-[11px]">Accuracy of algorithms, edge case handling, and asymptotic trade-offs.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D0] space-y-1">
                      <span className="font-bold text-[#111815]">2. Communication Pacing</span>
                      <p className="text-zinc-500 text-[11px]">Cadence, tone modulation, filler word suppression, and hesitation index.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D0] space-y-1">
                      <span className="font-bold text-[#111815]">3. Answer Depth</span>
                      <p className="text-zinc-500 text-[11px]">System architecture trade-offs (CAP theorem, caching, database sharding).</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D0] space-y-1">
                      <span className="font-bold text-[#111815]">4. STAR Behavioral</span>
                      <p className="text-zinc-500 text-[11px]">Structured Situation, Task, Action, and Result resolution framing.</p>
                    </div>
                  </div>
                  <Link
                    href="/interview"
                    className="w-full py-2.5 rounded-full bg-[#111815] text-white text-xs font-bold text-center block hover:bg-[#202e26]"
                  >
                    Test Your Skills Against This Rubric
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
