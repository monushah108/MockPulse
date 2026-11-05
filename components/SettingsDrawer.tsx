"use client";

import React from "react";
import {
  X,
  Volume2,
  Mic,
  Sliders,
  Zap,
  ShieldCheck,
  Cpu,
  Radio,
} from "lucide-react";
import { InterviewSettings } from "../types/interview";
import { VOICE_MODELS } from "../lib/mockData";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: InterviewSettings;
  onUpdateSettings: (newSettings: Partial<InterviewSettings>) => void;
}

export function SettingsDrawer({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#18181b] border border-[#27272a] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Voice & Audio Preferences</h3>
              <p className="text-xs text-zinc-400">Configure device routing and speech synthesis</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Audio Input Device */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <Mic className="w-3.5 h-3.5 text-sky-400" />
              <span>Input Microphone Hardware</span>
            </label>
            <select
              value={settings.audioInputDevice}
              onChange={(e) => onUpdateSettings({ audioInputDevice: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Default Microphone (System Default)">
                Default Microphone (System Default)
              </option>
              <option value="Realtek High Definition Audio">
                Realtek High Definition Audio
              </option>
              <option value="Studio USB Condenser Mic (24-bit 48kHz)">
                Studio USB Condenser Mic (24-bit 48kHz)
              </option>
              <option value="AirPods Pro (Bluetooth Hands-Free)">
                AirPods Pro (Bluetooth Hands-Free)
              </option>
            </select>
          </div>

          {/* AI Voice Model */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Interviewer Voice Persona</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {VOICE_MODELS.map((model) => {
                const isSelected = settings.voiceModel === model;
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() =>
                      onUpdateSettings({
                        voiceModel: model as InterviewSettings["voiceModel"],
                      })
                    }
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-500/60 text-white shadow-md shadow-indigo-950/40"
                        : "bg-zinc-950/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-semibold text-zinc-100">{model.split(" ")[0]}</div>
                    <div className="text-[10px] text-zinc-400 truncate">
                      {model.slice(model.indexOf("("))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speech Rate / Pacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-indigo-400" />
                <span>Interviewer Speech Rate</span>
              </span>
              <span className="font-mono text-indigo-400 font-bold">{settings.speed}x</span>
            </div>
            <div className="flex items-center gap-2">
              {[0.9, 1.0, 1.1, 1.25].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => onUpdateSettings({ speed: spd })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    settings.speed === spd
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Barge-In & Noise Suppression Toggles */}
          <div className="space-y-3 pt-2 border-t border-zinc-800/80">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Real-time Barge-In Detection</span>
                </span>
                <p className="text-[11px] text-zinc-500">
                  Allow candidate to immediately interrupt AI without pressing a button
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.bargeInEnabled}
                onChange={(e) => onUpdateSettings({ bargeInEnabled: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hardware Echo & Noise Suppression</span>
                </span>
                <p className="text-[11px] text-zinc-500">
                  Filters ambient keyboard typing and room acoustic reverberation
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.noiseSuppression}
                onChange={(e) => onUpdateSettings({ noiseSuppression: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#27272a] bg-[#121215] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}

