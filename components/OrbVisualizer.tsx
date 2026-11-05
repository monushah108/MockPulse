"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mic, Volume2, Cpu, Activity } from "lucide-react";
import { OrbState } from "../types/interview";

interface OrbVisualizerProps {
  state: OrbState;
  micVolume: number;
  frequencyData: number[];
  onStateChange?: (state: OrbState) => void;
  isMuted?: boolean;
}

export function OrbVisualizer({
  state,
  micVolume,
  frequencyData,
  onStateChange,
  isMuted = false,
}: OrbVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let phase = 0;
    const particles: {
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
      color: string;
    }[] = [];

    // Initialize decorative stardust particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 0.8,
        speed: Math.random() * 0.015 + 0.005,
        angle: Math.random() * Math.PI * 2,
        color:
          i % 2 === 0
            ? "rgba(194, 75, 27, 0.8)" // Terracotta
            : "rgba(234, 179, 8, 0.8)", // Warm Amber
      });
    }

    const render = () => {
      phase += 0.04;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing ambient aura
      const baseRadius = 88;
      const auraGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.4,
        centerX,
        centerY,
        baseRadius * 2.1
      );

      if (state === "ai_speaking") {
        auraGradient.addColorStop(0, "rgba(194, 75, 27, 0.45)"); // Terracotta
        auraGradient.addColorStop(0.5, "rgba(245, 158, 11, 0.25)"); // Warm Gold
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (state === "listening") {
        auraGradient.addColorStop(0, isMuted ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.35)"); // Emerald
        auraGradient.addColorStop(0.5, isMuted ? "rgba(239, 68, 68, 0.1)" : "rgba(56, 189, 248, 0.2)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (state === "thinking") {
        auraGradient.addColorStop(0, "rgba(168, 85, 247, 0.4)"); // Amethyst
        auraGradient.addColorStop(0.5, "rgba(194, 75, 27, 0.2)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        auraGradient.addColorStop(0, "rgba(113, 113, 122, 0.15)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 2.1, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multi-Wave dynamic fluid curves
      const waveCount = state === "ai_speaking" ? 5 : state === "listening" ? 4 : 3;

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveOffset = (w * Math.PI) / waveCount;
        const radiusMultiplier = 1 + w * 0.14;

        let dynamicAmp = 10;
        if (state === "ai_speaking") {
          dynamicAmp = 18 + Math.sin(phase * 1.5 + w) * 12 + ((frequencyData[w * 3] || 30) / 100) * 16;
        } else if (state === "listening") {
          const micBoost = isMuted ? 0 : (micVolume / 100) * 26;
          dynamicAmp = 4 + micBoost + Math.sin(phase * 0.8 + w) * 3;
        } else if (state === "thinking") {
          dynamicAmp = 6 + Math.sin(phase * 2 + w * 2) * 4;
        }

        const points = 72;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const harmonic = Math.sin(angle * (3 + w) + phase * (w % 2 === 0 ? 1 : -1) + waveOffset);
          const r = baseRadius * radiusMultiplier + harmonic * dynamicAmp;

          const px = centerX + Math.cos(angle) * r;
          const py = centerY + Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        // Stroke styling based on state
        if (state === "ai_speaking") {
          ctx.strokeStyle = w % 2 === 0 ? "rgba(194, 75, 27, 0.85)" : "rgba(245, 158, 11, 0.9)";
          ctx.lineWidth = 2.2;
        } else if (state === "listening") {
          ctx.strokeStyle = isMuted
            ? "rgba(239, 68, 68, 0.7)"
            : w % 2 === 0
            ? "rgba(16, 185, 129, 0.85)"
            : "rgba(14, 165, 233, 0.75)";
          ctx.lineWidth = 1.8;
        } else if (state === "thinking") {
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.5 + Math.sin(phase + w) * 0.3})`;
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = "rgba(113, 113, 122, 0.3)";
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();
      }

      // 3. Orbiting particles
      particles.forEach((p) => {
        p.angle += p.speed * (state === "ai_speaking" ? 1.6 : state === "thinking" ? 2.2 : 0.8);
        const dist = baseRadius * (1.1 + Math.sin(p.angle * 2 + phase) * 0.35);
        p.x = centerX + Math.cos(p.angle) * dist;
        p.y = centerY + Math.sin(p.angle) * dist;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Central Core Sphere
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, baseRadius * 0.95);
      if (state === "ai_speaking") {
        coreGrad.addColorStop(0, "#FFFBEB");
        coreGrad.addColorStop(0.3, "#F59E0B");
        coreGrad.addColorStop(0.7, "#C24B1B");
        coreGrad.addColorStop(1, "#7C2D12");
      } else if (state === "listening") {
        coreGrad.addColorStop(0, "#FFFFFF");
        coreGrad.addColorStop(0.35, isMuted ? "#F87171" : "#34D399");
        coreGrad.addColorStop(0.75, isMuted ? "#DC2626" : "#059669");
        coreGrad.addColorStop(1, isMuted ? "#7F1D1D" : "#064E3B");
      } else if (state === "thinking") {
        coreGrad.addColorStop(0, "#F5D0FE");
        coreGrad.addColorStop(0.4, "#C084FC");
        coreGrad.addColorStop(0.8, "#7E22CE");
        coreGrad.addColorStop(1, "#3B0764");
      } else {
        coreGrad.addColorStop(0, "#FAF8EE");
        coreGrad.addColorStop(0.6, "#A1A1AA");
        coreGrad.addColorStop(1, "#3F3F46");
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Shimmer reflection on top edge
      const specGrad = ctx.createLinearGradient(centerX - 40, centerY - 60, centerX + 40, centerY);
      specGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      specGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.ellipse(centerX - 15, centerY - 25, 45, 25, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [state, micVolume, frequencyData, isMuted]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none">
      {/* Background Glow */}
      <div
        className={`absolute w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          state === "ai_speaking"
            ? "bg-amber-400/20 scale-110"
            : state === "listening"
            ? isMuted
              ? "bg-red-400/20 scale-95"
              : "bg-emerald-400/25 scale-100"
            : state === "thinking"
            ? "bg-purple-400/25 animate-pulse"
            : "bg-zinc-300/10 scale-90"
        }`}
      />

      {/* Orbit Rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <div
          className={`absolute w-[330px] h-[330px] rounded-full border border-dashed pointer-events-none transition-all duration-1000 ${
            state === "thinking"
              ? "border-purple-400 animate-slow-rotate"
              : state === "ai_speaking"
              ? "border-[#C24B1B]/60 animate-slow-rotate"
              : "border-zinc-300"
          }`}
        />

        {/* Inner Counter-Rotating Ring */}
        <div
          className={`absolute w-[280px] h-[280px] rounded-full border border-dotted pointer-events-none transition-all duration-1000 ${
            state === "thinking"
              ? "border-purple-400 animate-reverse-rotate"
              : state === "ai_speaking"
              ? "border-amber-400/70 animate-reverse-rotate"
              : "border-zinc-200"
          }`}
        />

        {/* Main Canvas */}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative z-10 w-[290px] h-[290px] sm:w-[350px] sm:h-[350px]"
        />
      </div>

      {/* Real-Time Live Status Pill */}
      <div className="relative z-20 mt-3 flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {state === "ai_speaking" && (
            <motion.div
              key="ai_speaking"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#111815] text-[#111815] text-xs sm:text-sm font-extrabold shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-[#C24B1B] animate-pulse" />
              <span>Interviewer is speaking...</span>
              <span className="text-[11px] text-zinc-600 font-medium ml-1">
                (Speak to interrupt)
              </span>
            </motion.div>
          )}

          {state === "listening" && (
            <motion.div
              key="listening"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#111815] text-xs sm:text-sm font-extrabold shadow-sm transition-colors ${
                isMuted
                  ? "bg-red-100 text-red-900"
                  : "bg-[#CCFBF1] text-[#115E59]"
              }`}
            >
              <Mic
                className={`w-4 h-4 ${
                  isMuted ? "text-red-600" : "text-[#0F766E] animate-bounce"
                }`}
              />
              <span>
                {isMuted
                  ? "Microphone muted (Press Space to unmute)"
                  : "AI is listening... (Speak anytime to barge-in)"}
              </span>
            </motion.div>
          )}

          {state === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E8FF] border-2 border-[#111815] text-[#581C87] text-xs sm:text-sm font-extrabold shadow-sm"
            >
              <Cpu className="w-4 h-4 text-[#7E22CE] animate-spin" />
              <span>Analyzing answer & formulating follow-up...</span>
            </motion.div>
          )}

          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E0D0] text-zinc-600 text-xs sm:text-sm font-bold shadow-xs"
            >
              <Activity className="w-4 h-4 text-zinc-400" />
              <span>Standby • Ready for voice session</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Audio Equalizer Bar Graph Indicator */}
        <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-white border border-[#E5E0D0] shadow-xs">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono font-bold mr-1">
            {state === "ai_speaking"
              ? "AI Voice"
              : state === "listening"
              ? "Candidate"
              : "Latent"}
          </span>
          {frequencyData.slice(0, 12).map((val, idx) => (
            <motion.div
              key={idx}
              className={`w-1 rounded-full transition-all duration-75 ${
                state === "ai_speaking"
                  ? "bg-[#C24B1B]"
                  : state === "listening"
                  ? isMuted
                    ? "bg-red-400"
                    : "bg-[#059669]"
                  : "bg-purple-400"
              }`}
              style={{
                height: `${Math.max(3, Math.min(18, (val / 100) * 18))}px`,
              }}
            />
          ))}
        </div>

        {/* Quick Testing State Tabs */}
        {onStateChange && (
          <div className="flex items-center gap-1.5 mt-1.5 p-1 rounded-xl bg-white border border-[#E5E0D0] text-[11px] shadow-xs">
            <span className="text-zinc-500 px-1 text-[10px] font-mono font-bold">
              Test State:
            </span>
            <button
              type="button"
              onClick={() => onStateChange("ai_speaking")}
              className={`px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer ${
                state === "ai_speaking"
                  ? "bg-[#111815] text-white shadow-xs"
                  : "text-zinc-600 hover:text-[#111815] hover:bg-black/5"
              }`}
            >
              AI Speaking
            </button>
            <button
              type="button"
              onClick={() => onStateChange("listening")}
              className={`px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer ${
                state === "listening"
                  ? "bg-[#059669] text-white shadow-xs"
                  : "text-zinc-600 hover:text-[#111815] hover:bg-black/5"
              }`}
            >
              Listening
            </button>
            <button
              type="button"
              onClick={() => onStateChange("thinking")}
              className={`px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer ${
                state === "thinking"
                  ? "bg-[#7E22CE] text-white shadow-xs"
                  : "text-zinc-600 hover:text-[#111815] hover:bg-black/5"
              }`}
            >
              Thinking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
