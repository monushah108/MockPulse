"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  Layers,
  Code2,
  ExternalLink,
  Target,
} from "lucide-react";
import { ResumeProfile } from "../types/interview";

interface ResumeContextDrawerProps {
  resume: ResumeProfile;
}

export function ResumeContextDrawer({ resume }: ResumeContextDrawerProps) {
  const [openSection, setOpenSection] = useState<"projects" | "skills" | "topics" | null>("projects");
  const [expandedProject, setExpandedProject] = useState<string | null>("proj-1");

  const toggleSection = (section: "projects" | "skills" | "topics") => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col h-full bg-[#18181b]/50 rounded-2xl border border-[#27272a] overflow-hidden">
      {/* Resume Overview Header */}
      <div className="p-4 border-b border-[#27272a] bg-[#121215]/80 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-100">
                {resume.candidateName}
              </h3>
              <p className="text-[11px] text-zinc-400">{resume.targetRole} • {resume.experienceLevel}</p>
            </div>
          </div>

          <div className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-medium">
            {resume.alignmentScore}% Match
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/80">
          <Target className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{resume.parsedSummary}</span>
        </div>
      </div>

      {/* Accordion Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {/* Accordion Item 1: Extracted Projects */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("projects")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Extracted Projects ({resume.projects.length})</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                openSection === "projects" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "projects" && (
            <div className="p-3 pt-1 space-y-2 border-t border-zinc-800/60 bg-zinc-950/40">
              {resume.projects.map((proj) => {
                const isExpanded = expandedProject === proj.id;

                return (
                  <div
                    key={proj.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 space-y-2 transition-all"
                  >
                    <div
                      onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-100 hover:text-indigo-300">
                          {proj.name}
                        </span>
                        {proj.probedInQuestion && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                            Probed in Q{proj.probedInQuestion}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-3 h-3 text-zinc-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {proj.description}
                    </p>

                    {isExpanded && (
                      <div className="space-y-2 pt-1 border-t border-zinc-800/70">
                        <div className="text-[11px] text-emerald-400 bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                          <strong className="font-semibold text-emerald-300">Key Metric:</strong>{" "}
                          {proj.highlight}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Accordion Item 2: Detected Skills */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("skills")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Parsed Skill Matrix ({resume.skillsCount})</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                openSection === "skills" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "skills" && (
            <div className="p-3 pt-1 space-y-3 border-t border-zinc-800/60 bg-zinc-950/40">
              {resume.skills.map((cat) => (
                <div key={cat.category} className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accordion Item 3: Topics Covered So Far */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("topics")}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Topics & Rubric Coverage</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                openSection === "topics" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "topics" && (
            <div className="p-3 pt-1 space-y-2 border-t border-zinc-800/60 bg-zinc-950/40">
              {resume.coveredTopics.map((top) => (
                <div
                  key={top.id}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-xs"
                >
                  {top.status === "covered" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  ) : top.status === "in-progress" ? (
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mt-0.5 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                  )}

                  <div className="flex-1">
                    <p
                      className={`text-[11px] font-medium ${
                        top.status === "covered"
                          ? "text-zinc-200 line-through decoration-zinc-600"
                          : top.status === "in-progress"
                          ? "text-indigo-300 font-semibold"
                          : "text-zinc-500"
                      }`}
                    >
                      {top.topic}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-mono">{top.round}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
