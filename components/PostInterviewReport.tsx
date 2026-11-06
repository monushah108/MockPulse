"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Sparkles,
  FileJson,
  FileText,
  Clock,
  Zap,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  BookmarkCheck,
  Check,
} from "lucide-react";
import { PostInterviewMetrics, TranscriptItem } from "../types/interview";

interface PostInterviewReportProps {
  metrics: PostInterviewMetrics;
  transcript: TranscriptItem[];
  targetRole: string;
  roundType: string;
  onRestart: () => void;
}

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
            className="stroke-zinc-200"
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
          <span className="text-xl font-black text-[#111815] font-mono">{value}%</span>
          <span className="text-[9px] text-zinc-500 font-mono uppercase font-bold tracking-wider">
            {sublabel}
          </span>
        </div>
      </div>

      <span className="text-xs font-bold text-[#111815] text-center max-w-[110px]">
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
  const [showTurnBreakdown, setShowTurnBreakdown] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C24B1B", "#FEF08A", "#166534", "#7E22CE"],
      });
    } catch {
      // Confetti fallback
    }
  }, []);

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

  const handleExportTXT = () => {
    let content = `# MockPulse Voice Interview Diagnostic Report\n`;
    content += `Target Role: ${targetRole}\nRound: ${roundType}\nOverall Score: ${metrics.overallScore}/100 (${metrics.recommendation})\n`;
    content += `Date: ${new Date().toLocaleString()}\n\n`;
    content += `=== PERFORMANCE METRICS ===\n`;
    content += `- Technical Clarity: ${metrics.technicalClarity}%\n`;
    content += `- Communication Pacing: ${metrics.communicationPacing}%\n`;
    content += `- Depth of Answers: ${metrics.depthOfAnswers}%\n`;
    content += `- Average Latency: ${metrics.avgLatencyMs}ms\n`;
    content += `- Speaking Rate: ${metrics.wpm} words/min\n`;
    content += `- Filler Words Detected: ${metrics.fillerWords}\n\n`;

    if (metrics.detectedTechKeywords && metrics.detectedTechKeywords.length > 0) {
      content += `=== TECHNICAL VOCABULARY ARTICULATED ===\n`;
      content += `${metrics.detectedTechKeywords.join(", ")}\n\n`;
    }

    content += `=== KEY STRENGTHS ===\n`;
    metrics.strengths.forEach((s) => (content += `* ${s}\n`));
    content += `\n=== ACTIONABLE AREAS FOR IMPROVEMENT ===\n`;
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

  const isHire = metrics.recommendation.includes("Hire");

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full relative z-10 bg-white rounded-3xl border-2 border-[#111815] p-6 sm:p-9 space-y-8 shadow-xl text-[#111815]"
      >
        {/* Top Header Card: Hire Decision & Overall Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E5E0D0]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase font-bold border flex items-center gap-1 ${
                  isHire
                    ? "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]"
                    : "bg-[#FEF08A] text-[#713F12] border-[#FDE047]"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Session Complete
              </span>
              <span className="text-xs text-zinc-500 font-bold">{targetRole}</span>
              <span className="text-zinc-300">•</span>
              <span className="text-xs text-zinc-500 font-bold">{roundType}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111815]">
              Candidate Performance Diagnostic
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              Real-time voice acoustics, technical depth, and communication cadence evaluation.
            </p>
          </div>

          {/* Overall Score Badge Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0] shadow-xs self-start sm:self-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] border-2 border-[#111815] flex items-center justify-center flex-col shadow-xs">
              <span className="text-xl font-black text-[#111815] font-mono leading-none">
                {metrics.overallScore}
              </span>
              <span className="text-[9px] text-[#713F12] font-mono font-bold">/ 100</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-zinc-500">
                Evaluation Decision
              </span>
              <div
                className={`text-base font-extrabold flex items-center gap-1.5 ${
                  isHire ? "text-[#166534]" : "text-[#C24B1B]"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{metrics.recommendation}</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">
                {metrics.overallScore >= 88
                  ? "Top 5% percentile candidate"
                  : metrics.overallScore >= 75
                  ? "Top 20% engineering bar"
                  : "Promising baseline; growth targeted"}
              </span>
            </div>
          </div>
        </div>

        {/* 1. Scores Overview: Circular Progress Rings */}
        <div className="p-6 rounded-2xl bg-[#FAF8EE] border border-[#E5E0D0] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#111815] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C24B1B]" />
              <span>Core Diagnostic Competencies</span>
            </h3>
            <span className="text-[11px] font-mono font-bold text-zinc-500">
              Senior Engineering Benchmark
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 justify-items-center">
            <CircularProgress
              value={metrics.technicalClarity}
              label="Technical Clarity"
              colorStroke="stroke-[#C24B1B]"
              sublabel="Logic"
            />
            <CircularProgress
              value={metrics.communicationPacing}
              label="Communication Pacing"
              colorStroke="stroke-[#059669]"
              sublabel="Fluency"
            />
            <CircularProgress
              value={metrics.depthOfAnswers}
              label="Depth of Answers"
              colorStroke="stroke-[#7E22CE]"
              sublabel="Systems"
            />
          </div>
        </div>

        {/* 2. Real-Time Telemetry Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#FEF08A]/30 border border-[#FDE047] space-y-1">
            <span className="text-[10px] text-[#713F12] uppercase font-mono font-bold flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-[#C24B1B]" />
              <span>Speaking Pacing</span>
            </span>
            <div className="text-base font-black text-[#111815] font-mono">{metrics.wpm} WPM</div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              {metrics.wpm >= 120 && metrics.wpm <= 165 ? "Optimal cadence (125-155)" : "Slight variance"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFEDD5]/40 border border-[#FDBA74] space-y-1">
            <span className="text-[10px] text-[#C24B1B] uppercase font-mono font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-[#C24B1B]" />
              <span>Filler Words</span>
            </span>
            <div className="text-base font-black text-[#111815] font-mono">
              {metrics.fillerWords} detected
            </div>
            <span className="text-[10px] text-zinc-600 font-medium">
              {metrics.fillerDetails && metrics.fillerDetails.length > 0
                ? `${metrics.fillerDetails.map((f) => `'${f.word}' (${f.count})`).slice(0, 2).join(", ")}`
                : "Minimal hesitation tokens"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#DCFCE7]/40 border border-[#86EFAC] space-y-1">
            <span className="text-[10px] text-[#166534] uppercase font-mono font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#166534]" />
              <span>Response Latency</span>
            </span>
            <div className="text-base font-black text-[#111815] font-mono">{metrics.avgLatencyMs}ms</div>
            <span className="text-[10px] text-[#166534] font-semibold">Sub-600ms quick response</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F3E8FF]/40 border border-[#E9D5FF] space-y-1">
            <span className="text-[10px] text-[#581C87] uppercase font-mono font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#7E22CE]" />
              <span>Session Duration</span>
            </span>
            <div className="text-base font-black text-[#111815] font-mono">
              {formatDuration(metrics.totalDurationSeconds)}
            </div>
            <span className="text-[10px] text-zinc-600 font-medium">
              {metrics.dialogueCount} question turns logged
            </span>
          </div>
        </div>

        {/* 3. Detected Technical Vocabulary Articulated */}
        {metrics.detectedTechKeywords && metrics.detectedTechKeywords.length > 0 && (
          <div className="p-4 rounded-2xl bg-white border border-[#E5E0D0] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111815]">
              <Cpu className="w-3.5 h-3.5 text-[#C24B1B]" />
              <span>Technical Vocabulary Articulated in Responses:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {metrics.detectedTechKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#FAF8EE] border border-[#E5E0D0] text-[#111815] flex items-center gap-1 shadow-2xs"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>{keyword}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4. Strengths & Actionable Improvements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Strengths List */}
          <div className="p-5 rounded-2xl bg-[#DCFCE7]/30 border border-[#86EFAC] space-y-3">
            <div className="flex items-center gap-2 text-[#166534] font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Observed Performance Strengths</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#14532D] font-medium">
              {metrics.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#166534] mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Areas of Improvement */}
          <div className="p-5 rounded-2xl bg-[#FEF08A]/30 border border-[#FDE047] space-y-3">
            <div className="flex items-center gap-2 text-[#854D0E] font-bold text-xs sm:text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Actionable Growth Directives</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#713F12] font-medium">
              {metrics.improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#854D0E] mt-1.5 shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. Turn-by-Turn Diagnostic Breakdown (Collapsible) */}
        {metrics.turnDiagnostics && metrics.turnDiagnostics.length > 0 && (
          <div className="rounded-2xl border border-[#E5E0D0] overflow-hidden bg-[#FAF8EE]">
            <button
              type="button"
              onClick={() => setShowTurnBreakdown(!showTurnBreakdown)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-black/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black text-[#111815]">
                <BookmarkCheck className="w-4 h-4 text-[#C24B1B]" />
                <span>Detailed Turn-by-Turn Diagnostic Evaluation</span>
                <span className="text-[11px] font-mono text-zinc-500 font-bold">
                  ({metrics.turnDiagnostics.length} turns evaluated)
                </span>
              </div>
              {showTurnBreakdown ? (
                <ChevronUp className="w-4 h-4 text-zinc-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {showTurnBreakdown && (
              <div className="p-4 pt-0 space-y-3 divide-y divide-[#E5E0D0]">
                {metrics.turnDiagnostics.map((turn) => (
                  <div key={turn.turnNumber} className="pt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#FEF08A] font-mono font-bold text-[#713F12] text-[10px]">
                          Turn #{turn.turnNumber}
                        </span>
                        <span className="font-bold text-[#111815]">{turn.category}</span>
                      </div>
                      <span className="font-mono font-black text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-md text-xs">
                        Score: {turn.score}%
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 italic pl-2 border-l-2 border-zinc-300">
                      &ldquo;{turn.candidateExcerpt}&rdquo;
                    </p>

                    <p className="text-xs font-semibold text-[#111815] flex items-center gap-1.5">
                      <span className="text-[#C24B1B] font-bold">Critique:</span> {turn.critique}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. Action Buttons & Export Section */}
        <div className="pt-4 border-t border-[#E5E0D0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8EE] hover:bg-[#F4F1E4] border border-[#E5E0D0] text-[#111815] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <FileJson className="w-4 h-4 text-[#C24B1B]" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={handleExportTXT}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8EE] hover:bg-[#F4F1E4] border border-[#E5E0D0] text-[#111815] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#059669]" />
              <span>Export TXT</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
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
