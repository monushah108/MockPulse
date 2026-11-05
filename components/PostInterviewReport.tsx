"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Download,
  RotateCcw,
  Sparkles,
  FileJson,
  FileText,
  Clock,
  Zap,
  MessageSquare,
  AlertTriangle,
  Share2,
} from "lucide-react";
import { PostInterviewMetrics, TranscriptItem } from "../types/interview";

interface PostInterviewReportProps {
  metrics: PostInterviewMetrics;
  transcript: TranscriptItem[];
  targetRole: string;
  roundType: string;
  onRestart: () => void;
}

// Reusable Circular Progress Ring Component with SVG KaTeX-like precision
function CircularProgress({
  value,
  label,
  colorStroke,
  sublabel,
}: {
  value: number;
  label: string;
  colorStroke: string;
  sublabel: string;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-zinc-800"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Progress Value */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={colorStroke}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 1.4s ease-out",
            }}
          />
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-white font-mono">{value}%</span>
          <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
            {sublabel}
          </span>
        </div>
      </div>

      <span className="text-xs font-semibold text-zinc-300 text-center max-w-[110px]">
        {label}
      </span>
    </div>
  );
}

export function PostInterviewReport({
  metrics,
  transcript,
  targetRole,
  roundType,
  onRestart,
}: PostInterviewReportProps) {
  // Fire celebratory confetti when report opens
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#38bdf8", "#34d399", "#a855f7"],
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // Export Transcript as JSON file
  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          {
            reportSummary: metrics,
            metadata: {
              targetRole,
              roundType,
              exportedAt: new Date().toISOString(),
            },
            transcript,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `MockPulse_Interview_Report_${targetRole.replace(/\s+/g, "_")}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export Transcript as TXT / Markdown file
  const handleExportTXT = () => {
    let content = `# MockPulse Voice Interview Report\n`;
    content += `Target Role: ${targetRole}\nRound: ${roundType}\nOverall Score: ${metrics.overallScore}/100 (${metrics.recommendation})\n`;
    content += `Date: ${new Date().toLocaleString()}\n\n`;
    content += `=== PERFORMANCE METRICS ===\n`;
    content += `- Technical Clarity: ${metrics.technicalClarity}%\n`;
    content += `- Communication Pacing: ${metrics.communicationPacing}%\n`;
    content += `- Depth of Answers: ${metrics.depthOfAnswers}%\n`;
    content += `- Average Latency: ${metrics.avgLatencyMs}ms\n`;
    content += `- Speaking Rate: ${metrics.wpm} words/min\n\n`;
    content += `=== STRENGTHS ===\n`;
    metrics.strengths.forEach((s) => (content += `* ${s}\n`));
    content += `\n=== AREAS FOR IMPROVEMENT ===\n`;
    metrics.improvements.forEach((i) => (content += `* ${i}\n`));
    content += `\n=== FULL TRANSCRIPT LOG ===\n\n`;

    transcript.forEach((t) => {
      content += `[${t.timestamp}] ${t.speaker === "ai" ? "Interviewer AI" : "Candidate"} (${
        t.category || "General"
      }):\n${t.text}\n\n`;
    });

    const dataStr =
      "data:text/plain;charset=utf-8," + encodeURIComponent(content);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `MockPulse_Interview_Transcript_${targetRole.replace(/\s+/g, "_")}.txt`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full relative z-10 glass-panel-elevated rounded-3xl p-6 sm:p-9 space-y-8"
      >
        {/* Top Header Card: Hire Decision & Overall Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#27272a]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Session Complete
              </span>
              <span className="text-xs text-zinc-400">{targetRole}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Candidate Performance Diagnostic
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Evaluated against real-time voice latency, engineering depth, and communication clarity.
            </p>
          </div>

          {/* Overall Score Badge Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-[#27272a] shadow-lg self-start sm:self-auto">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-[2px]">
              <div className="w-full h-full bg-[#121215] rounded-[10px] flex items-center justify-center flex-col">
                <span className="text-xl font-black text-white font-mono leading-none">
                  {metrics.overallScore}
                </span>
                <span className="text-[9px] text-zinc-400 font-mono">/ 100</span>
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">
                Recommendation
              </span>
              <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>{metrics.recommendation}</span>
              </div>
              <span className="text-[11px] text-zinc-400">Top 5% percentile candidate</span>
            </div>
          </div>
        </div>

        {/* 1. Scores Overview: Circular Progress Rings */}
        <div className="p-6 rounded-2xl bg-zinc-950/60 border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-zinc-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Core Competency Rings</span>
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">Benchmark: Mid/Senior bar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 justify-items-center">
            <CircularProgress
              value={metrics.technicalClarity}
              label="Technical Clarity"
              colorStroke="stroke-indigo-500"
              sublabel="Logic"
            />
            <CircularProgress
              value={metrics.communicationPacing}
              label="Communication Pacing"
              colorStroke="stroke-sky-400"
              sublabel="Fluency"
            />
            <CircularProgress
              value={metrics.depthOfAnswers}
              label="Depth of Answers"
              colorStroke="stroke-emerald-400"
              sublabel="Systems"
            />
          </div>
        </div>

        {/* 2. Real-Time Telemetry Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-mono flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-sky-400" />
              <span>Speaking Pacing</span>
            </span>
            <div className="text-base font-bold text-zinc-100 font-mono">{metrics.wpm} WPM</div>
            <span className="text-[10px] text-emerald-400">Optimal cadence (130-160)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-mono flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Filler Words</span>
            </span>
            <div className="text-base font-bold text-zinc-100 font-mono">{metrics.fillerWords} detected</div>
            <span className="text-[10px] text-zinc-400">&apos;Um&apos;, &apos;Like&apos; below avg</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 text-indigo-400" />
              <span>Response Latency</span>
            </span>
            <div className="text-base font-bold text-zinc-100 font-mono">{metrics.avgLatencyMs}ms</div>
            <span className="text-[10px] text-emerald-400">Immediate confidence</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-400" />
              <span>Total Duration</span>
            </span>
            <div className="text-base font-bold text-zinc-100 font-mono">
              {formatDuration(metrics.totalDurationSeconds)}
            </div>
            <span className="text-[10px] text-zinc-400">{metrics.dialogueCount} question turns</span>
          </div>
        </div>

        {/* 3. Strengths & Actionable Improvements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Strengths List */}
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Strengths Observed</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {metrics.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Areas of Improvement */}
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Actionable Growth Areas</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {metrics.improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Action Buttons & Export Section */}
        <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold transition-all active:scale-95"
            >
              <FileJson className="w-4 h-4 text-sky-400" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={handleExportTXT}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold transition-all active:scale-95"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Export TXT</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Another Round</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

