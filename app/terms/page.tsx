"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, CheckCircle2, Scale, Clock, Lock, ArrowRight } from "lucide-react";
import { LandingFooter } from "../../components/LandingFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8EE] text-[#111815] selection:bg-yellow-200 selection:text-black">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8EE]/90 backdrop-blur-md border-b border-[#E5E0D0] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#FEF08A] border-2 border-[#111815] flex items-center justify-center text-[#111815] font-black text-lg group-hover:scale-105 transition-transform shadow-xs">
              M
            </div>
            <span className="font-black text-xl tracking-tight text-[#111815]">
              MockPulse
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#111815]/30 hover:bg-black/5 text-xs font-bold text-[#111815] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/interview"
              className="px-5 py-2 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="w-full pt-12 pb-8 px-4 sm:px-6 bg-hero-grid border-b border-[#E5E0D0]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] text-[#713F12] border border-[#FDE047] text-xs font-bold font-mono uppercase">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111815]">
            Terms of Use
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 font-medium max-w-2xl leading-relaxed">
            Please review these Terms of Use before using MockPulse&apos;s real-time voice interview platform, WebRTC audio processing, and diagnostic scoring systems.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Last Updated: November 2026
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Version 2.4 Active</span>
          </div>
        </div>
      </section>

      {/* Main Legal Content */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white rounded-3xl border-2 border-[#111815] p-6 sm:p-10 shadow-xl space-y-10 text-sm leading-relaxed text-zinc-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing, browsing, or utilizing the <strong>MockPulse</strong> platform (&ldquo;Service&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our accompanying Privacy Policy. If you do not agree to these terms, you must discontinue use of the Service immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              <span>AI Voice Mock Interview Service</span>
            </h2>
            <p>
              MockPulse provides an AI-powered interactive voice simulation designed strictly for educational practice, technical interview preparation, and communication pacing diagnosis. 
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>MockPulse is an automated preparatory aid and does not guarantee job placement, employment offers, or specific results in real-world interviews.</li>
              <li>Responses, follow-up questions, and rubric ratings generated by our AI agent represent algorithmic evaluations based on current industry standards and candidate input.</li>
              <li>Audio transmission occurs over low-latency WebRTC channels for conversational barge-in simulation.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                3
              </span>
              <span>Resume Ingestion & Candidate Materials</span>
            </h2>
            <p>
              When you upload or drag-and-drop resume files (PDF, DOCX, or text) to customize your mock interview:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>You represent that you own or possess necessary authorization for all content contained within the uploaded documents.</li>
              <li>Uploaded resume text is parsed in memory to generate context-specific technical prompts and project inquiries.</li>
              <li>MockPulse does not sell, license, or distribute candidate resumes to third-party recruiters without explicit candidate opt-in.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                4
              </span>
              <span>Voice Data & Audio Processing Rights</span>
            </h2>
            <p>
              Candidate microphone audio streams are utilized in real-time to compute vocal amplitude, frequency spectrums, speech recognition, and diagnostic metrics (Pacing, Technical Clarity, and Answer Depth).
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0] text-xs font-medium space-y-2">
              <p className="font-bold text-[#111815] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#C24B1B]" />
                Ephemeral Audio Lifecycle
              </p>
              <p className="text-zinc-600">
                Live voice streams are processed ephemerally. Raw candidate audio recordings are not stored permanently on public servers; full session transcripts remain available strictly to the candidate for download (.JSON / .TXT) at the conclusion of their session.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                5
              </span>
              <span>User Conduct & Prohibited Uses</span>
            </h2>
            <p>You agree not to engage in any of the following activities:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>Attempting to probe, exploit, or bypass authentication and rate-limiting safeguards on MockPulse voice APIs.</li>
              <li>Transmitting unlawful, abusive, defamatory, or harassing audio during interview simulations.</li>
              <li>Reverse engineering speech synthesis weights, conversational models, or visual orb shaders.</li>
              <li>Automating bot traffic to flood simulated audio streams without authorization.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                6
              </span>
              <span>Disclaimer of Warranties & Limitation of Liability</span>
            </h2>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, MOCKPULSE DISCLAIMS ALL WARRANTIES, INCLUDING ACCURACY OF AI EVALUATION, NETWORK LATENCY STABILITY, AND FITNESS FOR A PARTICULAR CAREER OUTCOME.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF08A] text-[#111815] text-xs font-mono font-bold flex items-center justify-center">
                7
              </span>
              <span>Contact & Legal Inquiries</span>
            </h2>
            <p>
              For questions concerning these Terms of Use, platform guidelines, or organizational licensing, please contact:
            </p>
            <div className="pt-2 text-xs font-mono">
              <p className="font-bold text-[#111815]">MockPulse Legal & Support</p>
              <p className="text-zinc-600">Email: <a href="mailto:sonuk627422@gmail.com" className="text-[#C24B1B] font-bold hover:underline">sonuk627422@gmail.com</a></p>
              <p className="text-zinc-600">Maintainer: Monu Shah (@monushah108)</p>
            </div>
          </section>

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

