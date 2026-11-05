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
    const particles: { x: number; y: number; radius: number; speed: number; angle: number; color: string }[] = [];

    // Initialize decorative ambient stardust particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 0.8,
        speed: Math.random() * 0.015 + 0.005,
        angle: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? "rgba(99, 102, 241, 0.7)" : "rgba(56, 189, 248, 0.6)",
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
        auraGradient.addColorStop(0, "rgba(99, 102, 241, 0.45)");
        auraGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.25)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (state === "listening") {
        auraGradient.addColorStop(0, isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(56, 189, 248, 0.35)");
        auraGradient.addColorStop(0.5, isMuted ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.18)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (state === "thinking") {
        auraGradient.addColorStop(0, "rgba(168, 85, 247, 0.4)");
        auraGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.2)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        auraGradient.addColorStop(0, "rgba(71, 85, 105, 0.2)");
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

        // Amplitude is driven by audio engine
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
          ctx.strokeStyle = w % 2 === 0 ? "rgba(99, 102, 241, 0.75)" : "rgba(56, 189, 248, 0.85)";
          ctx.lineWidth = 2.2;
        } else if (state === "listening") {
          ctx.strokeStyle = isMuted
            ? "rgba(239, 68, 68, 0.5)"
            : w % 2 === 0
            ? "rgba(56, 189, 248, 0.7)"
            : "rgba(52, 211, 153, 0.65)";
          ctx.lineWidth = 1.8;
        } else if (state === "thinking") {
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 + Math.sin(phase + w) * 0.3})`;
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = "rgba(113, 113, 122, 0.3)";
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();
      }

      // 3. Orbiting particles (Gemini Live / Siri stardust effect)
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
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.3, "#818cf8");
        coreGrad.addColorStop(0.7, "#4f46e5");
        coreGrad.addColorStop(1, "#1e1b4b");
      } else if (state === "listening") {
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.35, isMuted ? "#f87171" : "#38bdf8");
        coreGrad.addColorStop(0.75, isMuted ? "#dc2626" : "#0284c7");
        coreGrad.addColorStop(1, "#082f49");
      } else if (state === "thinking") {
        coreGrad.addColorStop(0, "#f5d0fe");
        coreGrad.addColorStop(0.4, "#c084fc");
        coreGrad.addColorStop(0.8, "#7e22ce");
        coreGrad.addColorStop(1, "#3b0764");
      } else {
        coreGrad.addColorStop(0, "#e4e4e7");
        coreGrad.addColorStop(0.6, "#52525b");
        coreGrad.addColorStop(1, "#18181b");
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
      {/* Dynamic Background Glow Halo */}
      <div
        className={`absolute w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          state === "ai_speaking"
            ? "bg-indigo-600/25 glow-active-orb scale-110"
            : state === "listening"
            ? isMuted
              ? "bg-red-600/15 scale-95"
              : "bg-sky-500/20 glow-listening-orb scale-100"
            : state === "thinking"
            ? "bg-purple-600/25 glow-thinking-orb animate-pulse"
            : "bg-zinc-700/10 scale-90"
        }`}
      />

      {/* Rotating Accent Orbit Rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Shimmer Ring */}
        <div
          className={`absolute w-[340px] h-[340px] rounded-full border border-dashed pointer-events-none transition-all duration-1000 ${
            state === "thinking"
              ? "border-purple-500/40 animate-slow-rotate"
              : state === "ai_speaking"
              ? "border-indigo-500/30 animate-slow-rotate"
              : "border-zinc-800/60"
          }`}
        />

        {/* Inner Counter-Rotating Ring */}
        <div
          className={`absolute w-[290px] h-[290px] rounded-full border border-dotted pointer-events-none transition-all duration-1000 ${
            state === "thinking"
              ? "border-sky-400/40 animate-reverse-rotate"
              : state === "ai_speaking"
              ? "border-sky-400/30 animate-reverse-rotate"
              : "border-zinc-800/40"
          }`}
        />

        {/* Main Canvas Visualizer */}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative z-10 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]"
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
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-200 text-xs sm:text-sm font-medium shadow-lg shadow-indigo-950/40"
            >
              <Volume2 className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Interviewer is speaking...</span>
              <span className="text-[11px] text-indigo-400/70 ml-1">(Speak to interrupt)</span>
            </motion.div>
          )}

          {state === "listening" && (
            <motion.div
              key="listening"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium shadow-lg transition-colors ${
                isMuted
                  ? "bg-red-950/70 border-red-500/30 text-red-200 shadow-red-950/40"
                  : "bg-sky-950/70 border-sky-500/30 text-sky-200 shadow-sky-950/40"
              }`}
            >
              <Mic
                className={`w-4 h-4 ${
                  isMuted ? "text-red-400" : "text-sky-400 animate-bounce"
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
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium shadow-lg shadow-purple-950/40"
            >
              <Cpu className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Analyzing answer & formulating follow-up...</span>
            </motion.div>
          )}

          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs sm:text-sm"
            >
              <Activity className="w-4 h-4 text-zinc-500" />
              <span>Standby • Ready for voice session</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Audio Equalizer Bar Graph Indicator */}
        <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800/80">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono mr-1">
            {state === "ai_speaking" ? "AI Voice" : state === "listening" ? "Candidate" : "Latent"}
          </span>
          {frequencyData.slice(0, 12).map((val, idx) => (
            <motion.div
              key={idx}
              className={`w-1 rounded-full transition-all duration-75 ${
                state === "ai_speaking"
                  ? "bg-gradient-to-t from-indigo-500 to-sky-400"
                  : state === "listening"
                  ? isMuted
                    ? "bg-red-500/50"
                    : "bg-gradient-to-t from-sky-500 to-emerald-400"
                  : "bg-purple-500/40"
              }`}
              style={{
                height: `${Math.max(3, Math.min(18, (val / 100) * 18))}px`,
              }}
            />
          ))}
        </div>

        {/* Quick Testing State Tabs */}
        {onStateChange && (
          <div className="flex items-center gap-1.5 mt-1.5 p-1 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-[11px]">
            <span className="text-zinc-500 px-1 text-[10px] font-mono">Test State:</span>
            <button
              type="button"
              onClick={() => onStateChange("ai_speaking")}
              className={`px-2 py-0.5 rounded transition-colors ${
                state === "ai_speaking"
                  ? "bg-indigo-600 text-white font-medium shadow"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              AI Speaking
            </button>
            <button
              type="button"
              onClick={() => onStateChange("listening")}
              className={`px-2 py-0.5 rounded transition-colors ${
                state === "listening"
                  ? "bg-sky-600 text-white font-medium shadow"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              Listening
            </button>
            <button
              type="button"
              onClick={() => onStateChange("thinking")}
              className={`px-2 py-0.5 rounded transition-colors ${
                state === "thinking"
                  ? "bg-purple-600 text-white font-medium shadow"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
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

