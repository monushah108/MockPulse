"use client";

import React, { useState } from "react";
import {
  FileText,
  FolderGit2,
  CheckCircle2,
  Clock,
  ChevronDown,
  Layers,
  Code2,
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
    <div className="flex flex-col h-full bg-white rounded-3xl border-2 border-[#111815] overflow-hidden shadow-sm">
      {/* Resume Overview Header */}
      <div className="p-4 border-b border-[#E5E0D0] bg-[#FAF8EE] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEF08A] border border-[#FDE047] flex items-center justify-center text-[#713F12] shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-[#111815]">
                {resume.candidateName}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                {resume.targetRole} • {resume.experienceLevel}
              </p>
            </div>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] text-[11px] font-mono font-bold shadow-xs">
            {resume.alignmentScore}% Match
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-700 bg-white p-2.5 rounded-xl border border-[#E5E0D0] font-medium shadow-xs">
          <Target className="w-3.5 h-3.5 text-[#C24B1B] shrink-0" />
          <span className="truncate">{resume.parsedSummary}</span>
        </div>
      </div>

      {/* Accordion Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Accordion Item 1: Extracted Projects */}
        <div className="rounded-2xl border border-[#E5E0D0] bg-[#FAF8EE] overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("projects")}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#111815] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#C24B1B]" />
              <span>Extracted Projects ({resume.projects.length})</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-600 transition-transform ${
                openSection === "projects" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "projects" && (
            <div className="p-3 pt-1 space-y-2.5 border-t border-[#E5E0D0] bg-white">
              {resume.projects.map((proj) => {
                const isExpanded = expandedProject === proj.id;

                return (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-[#E5E0D0] bg-[#FAF8EE] p-3 space-y-2 transition-all shadow-xs"
                  >
                    <div
                      onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#111815] hover:text-[#C24B1B]">
                          {proj.name}
                        </span>
                        {proj.probedInQuestion && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[#FEF08A] text-[#713F12] border border-[#FDE047]">
                            Probed in Q{proj.probedInQuestion}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                      {proj.description}
                    </p>

                    {isExpanded && (
                      <div className="space-y-2 pt-1 border-t border-[#E5E0D0]">
                        <div className="text-[11px] text-[#166534] bg-[#DCFCE7] p-2 rounded-lg border border-[#86EFAC] font-medium">
                          <strong className="font-bold text-[#14532D]">Key Metric:</strong>{" "}
                          {proj.highlight}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white border border-[#E5E0D0] text-[#111815]"
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
        <div className="rounded-2xl border border-[#E5E0D0] bg-[#FAF8EE] overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("skills")}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#111815] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#7E22CE]" />
              <span>Parsed Skill Matrix ({resume.skillsCount})</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-600 transition-transform ${
                openSection === "skills" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "skills" && (
            <div className="p-3 pt-1 space-y-3 border-t border-[#E5E0D0] bg-white">
              {resume.skills.map((cat) => (
                <div key={cat.category} className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF8EE] border border-[#E5E0D0] text-[#111815] hover:border-[#111815] transition-colors"
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
        <div className="rounded-2xl border border-[#E5E0D0] bg-[#FAF8EE] overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("topics")}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#111815] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#166534]" />
              <span>Topics & Rubric Coverage</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-600 transition-transform ${
                openSection === "topics" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "topics" && (
            <div className="p-3 pt-1 space-y-2 border-t border-[#E5E0D0] bg-white">
              {resume.coveredTopics.map((top) => (
                <div
                  key={top.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF8EE] border border-[#E5E0D0] text-xs shadow-xs"
                >
                  {top.status === "covered" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : top.status === "in-progress" ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#C24B1B] border-t-transparent animate-spin mt-0.5 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  )}

                  <div className="flex-1">
                    <p
                      className={`text-[11px] font-bold ${
                        top.status === "covered"
                          ? "text-zinc-400 line-through decoration-zinc-400"
                          : top.status === "in-progress"
                          ? "text-[#C24B1B]"
                          : "text-zinc-600"
                      }`}
                    >
                      {top.topic}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-mono font-medium">
                      {top.round}
                    </span>
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
