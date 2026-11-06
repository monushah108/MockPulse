"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Clock, CheckCircle2, Server, ArrowRight, UserCheck } from "lucide-react";
import { LandingFooter } from "../../components/LandingFooter";

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-xs font-bold font-mono uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Protection & Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111815]">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 font-medium max-w-2xl leading-relaxed">
            Your candidate privacy, voice recordings, and resume context are safeguarded with end-to-end ephemeral streaming architecture.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Effective Date: November 2026
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">SOC-2 & GDPR Aligned</span>
          </div>
        </div>
      </section>

      {/* Main Privacy Disclosures Content */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white rounded-3xl border-2 border-[#111815] p-6 sm:p-10 shadow-xl space-y-10 text-sm leading-relaxed text-zinc-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              <span>Information We Process</span>
            </h2>
            <p>
              To deliver real-time voice interviews and diagnostic feedback, MockPulse processes the following types of information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0] space-y-1.5">
                <span className="font-bold text-[#111815] flex items-center gap-1.5 text-xs">
                  <Lock className="w-4 h-4 text-[#C24B1B]" />
                  Acoustic Audio Streams
                </span>
                <p className="text-xs text-zinc-600">
                  Microphone frequency amplitudes, speech duration, pitch variation, and vocal volume levels used solely for live speech recognition and candidate pacing diagnostics.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0] space-y-1.5">
                <span className="font-bold text-[#111815] flex items-center gap-1.5 text-xs">
                  <Server className="w-4 h-4 text-[#166534]" />
                  Resume & Experience Entities
                </span>
                <p className="text-xs text-zinc-600">
                  Uploaded resume files (PDF, DOCX) processed in-browser or volatile memory to generate role-relevant architecture and coding questions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              <span>Ephemeral Voice Processing Guarantee</span>
            </h2>
            <p>
              Unlike traditional video call recorders, <strong>MockPulse operates on an ephemeral audio pipeline</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>Candidate audio is streamed via secure WebRTC channels to local browser buffers and edge neural models.</li>
              <li>Once speech is converted to text tokens for the interview dialogue, raw audio buffers are purged from runtime memory.</li>
              <li>We do <strong>not</strong> retain persistent voice recordings on external data lakes.</li>
              <li>You maintain absolute sovereignty to download your full session transcript (.JSON / .TXT) or delete it immediately upon closing your browser.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-mono font-bold flex items-center justify-center">
                3
              </span>
              <span>AI Model Training Disclosure</span>
            </h2>
            <p>
              We firmly respect candidate intellectual property and privacy. <strong>Candidate interview answers, code explanations, system design architectures, and uploaded resumes are never used to train public foundation models</strong> without your explicit, opt-in consent.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-mono font-bold flex items-center justify-center">
                4
              </span>
              <span>Candidate Rights (GDPR & CCPA Compliant)</span>
            </h2>
            <p>Under international privacy regulations, you have guaranteed rights regarding your data:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li><strong>Right to Access & Portability:</strong> Export your full interview metrics and transcript at any time in machine-readable JSON format.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> Reset all local cached resumes and score histories with a single click.</li>
              <li><strong>No Data Brokering:</strong> MockPulse will never sell or rent candidate information, telemetry, or contact details to third-party advertisers.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-mono font-bold flex items-center justify-center">
                5
              </span>
              <span>Security Standards & Transport Encryption</span>
            </h2>
            <p>
              All communication between your browser and our real-time inference nodes is protected by TLS 1.3 / AES-256 encryption. WebRTC audio channels are secured via Datagram Transport Layer Security (DTLS) and Secure Real-time Transport Protocol (SRTP).
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#111815] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-mono font-bold flex items-center justify-center">
                6
              </span>
              <span>Data Protection Officer & Inquiries</span>
            </h2>
            <p>
              To exercise your privacy rights, request data purging, or ask technical questions regarding our voice pipeline:
            </p>
            <div className="pt-2 text-xs font-mono">
              <p className="font-bold text-[#111815]">MockPulse Privacy & Trust Office</p>
              <p className="text-zinc-600">Data Controller: Monu Shah (@monushah108)</p>
              <p className="text-zinc-600">Email: <a href="mailto:sonuk627422@gmail.com" className="text-[#166534] font-bold hover:underline">sonuk627422@gmail.com</a></p>
              <p className="text-zinc-600">Location: Delhi NCR, India</p>
            </div>
          </section>

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

