"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useAudioEngine() {
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [micDb, setMicDb] = useState<number>(-60);
  const [isMuted, setIsMuted] = useState(false);
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(16).fill(0));

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play synthesized subtle UI sounds without external assets
  const playChime = useCallback((type: "start" | "interrupt" | "mute" | "unmute" | "complete") => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "start") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "interrupt") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "mute") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.setValueAtTime(350, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "unmute") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.setValueAtTime(520, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "complete") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch {
      // AudioContext could be blocked by autoplay policies
    }
  }, []);

  // Real Microphone Stream Setup
  const startRealMic = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("getUserMedia not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      setHasMicPermission(true);

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMeter = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        const bars: number[] = [];
        const step = Math.max(1, Math.floor(dataArray.length / 16));

        for (let i = 0; i < 16; i++) {
          const val = dataArray[i * step] || 0;
          bars.push(Math.round((val / 255) * 100));
          sum += val;
        }

        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 255) * 160));
        setMicVolume(normalized);

        // Approximate dB (-60 to 0)
        const db = avg === 0 ? -60 : Math.round(20 * Math.log10(avg / 255));
        setMicDb(Math.max(-60, db));
        setFrequencyData(bars);

        animationFrameRef.current = requestAnimationFrame(updateMeter);
      };

      updateMeter();
      return true;
    } catch {
      setHasMicPermission(false);
      startMockMic();
      return false;
    }
  }, []);

  // Mock Mic Simulation for offline / sandbox testing
  const startMockMic = useCallback(() => {
    if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);

    let phase = 0;
    mockIntervalRef.current = setInterval(() => {
      phase += 0.2;
      const baseWave = Math.sin(phase) * 0.4 + 0.6;
      const noise = (Math.random() - 0.5) * 0.25;
      const level = Math.max(12, Math.min(85, Math.round((baseWave + noise) * 70)));

      setMicVolume(level);
      setMicDb(Math.round(-45 + (level / 100) * 35));

      const mockBars = Array.from({ length: 16 }, (_, i) => {
        const barWave = Math.sin(phase + i * 0.4) * 30 + 35;
        const barNoise = Math.random() * 20;
        return Math.min(100, Math.max(5, Math.round(barWave + barNoise)));
      });
      setFrequencyData(mockBars);
    }, 70);
  }, []);

  const stopMic = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mockIntervalRef.current) {
      clearInterval(mockIntervalRef.current);
      mockIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicVolume(0);
    setMicDb(-60);
    setFrequencyData(new Array(16).fill(0));
  }, []);

  const toggleMicTest = useCallback(async () => {
    if (isMicTesting) {
      stopMic();
      setIsMicTesting(false);
    } else {
      setIsMicTesting(true);
      await startRealMic();
    }
  }, [isMicTesting, startRealMic, stopMic]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      playChime(next ? "mute" : "unmute");
      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = !next;
        });
      }
      return next;
    });
  }, [playChime]);

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, [stopMic]);

  return {
    isMicTesting,
    hasMicPermission,
    micVolume: isMuted ? 0 : micVolume,
    micDb: isMuted ? -60 : micDb,
    frequencyData: isMuted ? new Array(16).fill(0) : frequencyData,
    isMuted,
    toggleMicTest,
    toggleMute,
    playChime,
    startMockMic,
    stopMic,
  };
}

