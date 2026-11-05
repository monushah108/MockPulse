"use client";

import React from "react";
import {
  X,
  Volume2,
  Mic,
  Sliders,
  Zap,
  ShieldCheck,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#FAF8EE] border-2 border-[#111815] shadow-2xl overflow-hidden flex flex-col text-[#111815]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E5E0D0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEF08A] border border-[#FDE047] flex items-center justify-center text-[#713F12]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#111815]">Voice & Audio Preferences</h3>
              <p className="text-xs text-zinc-500 font-medium">Configure device routing and speech synthesis</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Audio Input Device */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111815] flex items-center gap-2">
              <Mic className="w-3.5 h-3.5 text-[#C24B1B]" />
              <span>Input Microphone Hardware</span>
            </label>
            <select
              value={settings.audioInputDevice}
              onChange={(e) => onUpdateSettings({ audioInputDevice: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815]"
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
            <label className="text-xs font-bold text-[#111815] flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-[#7E22CE]" />
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
                    className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FEF08A] border-2 border-[#111815] text-[#111815] shadow-xs"
                        : "bg-white border-[#E5E0D0] text-zinc-600 hover:border-zinc-400"
                    }`}
                  >
                    <div className="font-extrabold text-[#111815]">{model.split(" ")[0]}</div>
                    <div className="text-[10px] text-zinc-600 truncate font-medium">
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
              <span className="font-bold text-[#111815] flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#C24B1B]" />
                <span>Interviewer Speech Rate</span>
              </span>
              <span className="font-mono text-[#C24B1B] font-black">{settings.speed}x</span>
            </div>
            <div className="flex items-center gap-2">
              {[0.9, 1.0, 1.1, 1.25].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => onUpdateSettings({ speed: spd })}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    settings.speed === spd
                      ? "bg-[#111815] border-[#111815] text-white"
                      : "bg-white border-[#E5E0D0] text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Barge-In & Noise Suppression Toggles */}
          <div className="space-y-3 pt-3 border-t border-[#E5E0D0]">
            <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-white border border-[#E5E0D0]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#111815] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C24B1B]" />
                  <span>Real-time Barge-In Detection</span>
                </span>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Allow candidate to immediately interrupt AI without pressing a button
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.bargeInEnabled}
                onChange={(e) => onUpdateSettings({ bargeInEnabled: e.target.checked })}
                className="w-4 h-4 accent-[#111815] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl bg-white border border-[#E5E0D0]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#111815] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hardware Echo & Noise Suppression</span>
                </span>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Filters ambient keyboard typing and room acoustic reverberation
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.noiseSuppression}
                onChange={(e) => onUpdateSettings({ noiseSuppression: e.target.checked })}
                className="w-4 h-4 accent-[#111815] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5E0D0] bg-white flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
