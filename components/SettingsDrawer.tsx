"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Volume2,
  Mic,
  Sliders,
  Zap,
  ShieldCheck,
  Radio,
  Play,
  Square,
  Sparkles,
  RefreshCw,
  Check,
} from "lucide-react";
import { InterviewSettings } from "../types/interview";
import { VOICE_MODELS } from "../lib/mockData";
import { speakWithAIVoice } from "../lib/aiInterviewEngine";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: InterviewSettings;
  onUpdateSettings: (newSettings: Partial<InterviewSettings>) => void;
}

const VOICE_PREVIEWS: Record<string, string> = {
  Nova: "Hello! I am Nova, your warm and conversational AI interviewer. I look forward to exploring your system designs.",
  Echo: "Greetings. I am Echo. We will dive deep into distributed system primitives, fault domains, and throughput bottlenecks.",
  Alloy: "Hi there. I am Alloy, your technical assessor. Let's analyze your algorithmic decisions and engineering trade-offs.",
  Shimmer: "Hello! I am Shimmer. I am excited to hear about the scalable architectures and impactful features you've shipped.",
};

const SPEED_PRESETS = [
  { label: "0.85x Deliberate", value: 0.85 },
  { label: "1.0x Normal", value: 1.0 },
  { label: "1.15x Dynamic", value: 1.15 },
  { label: "1.30x Rapid", value: 1.3 },
];

export function SettingsDrawer({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsDrawerProps) {
  const [deviceList, setDeviceList] = useState<{ id: string; label: string }[]>([]);
  const [isDetectingDevices, setIsDetectingDevices] = useState(false);
  const [activePreviewModel, setActivePreviewModel] = useState<string | null>(null);
  const cancelPreviewRef = useRef<(() => void) | null>(null);

  // Enumerate Real Hardware Audio Input Devices
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.enumerateDevices) return;

    const fetchDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((d) => d.kind === "audioinput");

        if (audioInputs.length > 0) {
          const formatted = audioInputs.map((d, index) => ({
            id: d.deviceId,
            label: d.label || `Microphone Input ${index + 1} (${d.deviceId.slice(0, 8)}...)`,
          }));
          setDeviceList(formatted);
        }
      } catch (err) {
        console.warn("Could not enumerate audio devices:", err);
      }
    };

    fetchDevices();

    const handleDeviceChange = () => fetchDevices();
    navigator.mediaDevices.addEventListener?.("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener?.("devicechange", handleDeviceChange);
      if (cancelPreviewRef.current) {
        cancelPreviewRef.current();
        cancelPreviewRef.current = null;
      }
    };
  }, []);

  // Request Microphone permissions to reveal hardware device labels
  const handleDetectMicrophones = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) return;
    setIsDetectingDevices(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Release tracks immediately
      stream.getTracks().forEach((track) => track.stop());

      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter((d) => d.kind === "audioinput");
      const formatted = audioInputs.map((d, index) => ({
        id: d.deviceId,
        label: d.label || `Microphone Input ${index + 1}`,
      }));
      setDeviceList(formatted);

      if (formatted.length > 0 && (!settings.audioInputDevice || settings.audioInputDevice.includes("Default"))) {
        onUpdateSettings({ audioInputDevice: formatted[0].label });
      }
    } catch (err) {
      console.warn("Could not access microphone for device enumeration:", err);
    } finally {
      setIsDetectingDevices(false);
    }
  };

  // Preview Voice Persona
  const handlePreviewVoice = (model: string) => {
    if (activePreviewModel === model) {
      // Stop preview
      if (cancelPreviewRef.current) {
        cancelPreviewRef.current();
        cancelPreviewRef.current = null;
      }
      setActivePreviewModel(null);
      return;
    }

    if (cancelPreviewRef.current) {
      cancelPreviewRef.current();
      cancelPreviewRef.current = null;
    }

    const key = model.split(" ")[0];
    const previewText =
      VOICE_PREVIEWS[key] ||
      `Hello! I am your AI interviewer using the ${model.split(" ")[0]} voice persona.`;

    setActivePreviewModel(model);

    const cancel = speakWithAIVoice(
      previewText,
      model,
      () => {
        setActivePreviewModel(model);
      },
      undefined,
      () => {
        setActivePreviewModel(null);
        cancelPreviewRef.current = null;
      },
      settings.speed
    );

    cancelPreviewRef.current = cancel;
  };

  // Stop speech when drawer closes
  const handleClose = () => {
    if (cancelPreviewRef.current) {
      cancelPreviewRef.current();
      cancelPreviewRef.current = null;
    }
    setActivePreviewModel(null);
    onClose();
  };

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
              <p className="text-xs text-zinc-500 font-medium">
                Hardware routing, neural voice personas & real-time telemetry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* 1. Audio Input Device */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#111815] flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-[#C24B1B]" />
                <span>Microphone Hardware Source</span>
              </label>

              <button
                type="button"
                onClick={handleDetectMicrophones}
                disabled={isDetectingDevices}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C24B1B] hover:underline cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isDetectingDevices ? "animate-spin" : ""}`} />
                <span>{isDetectingDevices ? "Detecting..." : "Detect Devices"}</span>
              </button>
            </div>

            <div className="relative">
              <select
                value={settings.audioInputDevice}
                onChange={(e) => onUpdateSettings({ audioInputDevice: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E0D0] text-xs font-bold text-[#111815] focus:outline-none focus:border-[#111815] shadow-xs cursor-pointer appearance-none pr-8"
              >
                <option value="Default Microphone (System Default)">
                  Default Microphone (System Default)
                </option>
                {deviceList.map((dev) => (
                  <option key={dev.id} value={dev.label}>
                    {dev.label}
                  </option>
                ))}
                {deviceList.length === 0 && (
                  <>
                    <option value="Realtek High Definition Audio">
                      Realtek High Definition Audio
                    </option>
                    <option value="Studio USB Condenser Mic (24-bit 48kHz)">
                      Studio USB Condenser Mic (24-bit 48kHz)
                    </option>
                    <option value="Headset Microphone (Hands-Free Audio)">
                      Headset Microphone (Hands-Free Audio)
                    </option>
                  </>
                )}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
                ▼
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 font-medium">
              Active routing: <span className="text-[#111815] font-semibold">{settings.audioInputDevice}</span>
            </p>
          </div>

          {/* 2. AI Voice Persona Selection with Preview */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#111815] flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-[#7E22CE]" />
                <span>Interviewer Voice Persona</span>
              </label>
              <span className="text-[10px] font-mono font-bold text-zinc-400">
                Click Preview to test speech
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {VOICE_MODELS.map((model) => {
                const isSelected = settings.voiceModel === model;
                const isPlaying = activePreviewModel === model;
                const modelName = model.split(" ")[0];
                const toneTag = model.slice(model.indexOf("(") + 1, model.indexOf(")"));

                return (
                  <div
                    key={model}
                    onClick={() =>
                      onUpdateSettings({
                        voiceModel: model as InterviewSettings["voiceModel"],
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
                      isSelected
                        ? "bg-[#FEF08A] border-2 border-[#111815] shadow-xs"
                        : "bg-white border-[#E5E0D0] hover:border-zinc-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#111815] text-sm flex items-center gap-1.5">
                          <span>{modelName}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#111815]" />}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded-md bg-black/5 text-zinc-700">
                          {toneTag.split("&")[0].trim()}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 font-medium mt-1">
                        {toneTag} tone
                      </p>
                    </div>

                    {/* Preview Voice Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviewVoice(model);
                      }}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-xs ${
                        isPlaying
                          ? "bg-red-500 text-white animate-pulse"
                          : isSelected
                          ? "bg-[#111815] text-white hover:bg-[#202e26]"
                          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          <span>Stop Preview</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Preview Voice</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Speech Rate / Pacing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#111815] flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#C24B1B]" />
                <span>Interviewer Speech Rate (Pacing)</span>
              </span>
              <span className="font-mono text-[#C24B1B] font-black px-2 py-0.5 rounded-md bg-[#FFEDD5] border border-[#FDBA74]">
                {settings.speed.toFixed(2)}x
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0.75"
              max="1.50"
              step="0.05"
              value={settings.speed}
              onChange={(e) => onUpdateSettings({ speed: parseFloat(e.target.value) })}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#111815]"
            />

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1.5">
              {SPEED_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => onUpdateSettings({ speed: preset.value })}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-colors cursor-pointer text-center truncate ${
                    Math.abs(settings.speed - preset.value) < 0.03
                      ? "bg-[#111815] border-[#111815] text-white"
                      : "bg-white border-[#E5E0D0] text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Barge-In & Noise Suppression Toggles */}
          <div className="space-y-3 pt-3 border-t border-[#E5E0D0]">
            <label className="flex items-center justify-between cursor-pointer p-3.5 rounded-2xl bg-white border border-[#E5E0D0] hover:border-zinc-400 transition-colors">
              <div className="space-y-0.5 pr-3">
                <span className="text-xs font-bold text-[#111815] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C24B1B]" />
                  <span>Sub-600ms Real-time Barge-In</span>
                </span>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Candidate speech immediately pauses AI speech for natural conversational interruption
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.bargeInEnabled}
                onChange={(e) => onUpdateSettings({ bargeInEnabled: e.target.checked })}
                className="w-4 h-4 accent-[#111815] rounded cursor-pointer shrink-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3.5 rounded-2xl bg-white border border-[#E5E0D0] hover:border-zinc-400 transition-colors">
              <div className="space-y-0.5 pr-3">
                <span className="text-xs font-bold text-[#111815] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hardware Echo & Ambient Noise Suppression</span>
                </span>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Eliminates acoustic speaker echo and mechanical keyboard clicks
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.noiseSuppression}
                onChange={(e) => onUpdateSettings({ noiseSuppression: e.target.checked })}
                className="w-4 h-4 accent-[#111815] rounded cursor-pointer shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5E0D0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C24B1B]" />
            <span>Settings apply live to next turn</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full bg-[#111815] hover:bg-[#202e26] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
