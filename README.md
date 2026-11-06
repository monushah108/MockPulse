# MockPulse 🎙️⚡
### Sub-Second Latency Real-Time AI Voice Mock Interview Platform
**Engineered with ❤️ by [Monu Shah](https://github.com/monushah108)**

[![Author](https://img.shields.io/badge/Author-Monu_Shah-111815?style=for-the-badge&logo=github)](https://github.com/monushah108)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Monu_Shah-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/monushah108)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-FEF08A?style=for-the-badge&colorA=111815)](LICENSE)

---

## 🌟 Overview

**MockPulse** is a high-performance, real-time voice conversational AI mock interview studio built for software engineers preparing for senior technical rounds. 

Unlike traditional text-based interview simulators, MockPulse operates with **sub-600ms conversational voice latency**, real-time **barge-in interruption detection**, multi-format **resume entity extraction**, and an automated **telemetry diagnostic scoring engine**.

---

## 🚀 Key Architectural Features

### 1. ⚡ Sub-600ms Conversational Voice Loop
* **Neural Speech Synthesis:** Streaming speech synthesis with four distinct interviewer personas:
  * `Nova` (Warm & Conversational)
  * `Echo` (Deep & Technical)
  * `Alloy` (Balanced & Crisp)
  * `Shimmer` (Expressive & Encouraging)
* **Real-time Speech Recognition:** Low-latency Web Speech recognition with active voice-activity-detection (VAD) and auto-silence finalization.
* **Instant Barge-In (Interruption):** Candidate can interrupt the AI at any time during an explanation; speech pauses within 200ms and switches seamlessly to active listening.

### 2. 📄 Universal Resume Entity Ingestion
* Ingests `.pdf`, `.docx`, `.txt`, `.json`, and `.md` resumes directly in the browser with zero external cloud dependencies.
* Parses candidate projects, tech stack tags, and seniority metrics.
* Dynamically tailors interview probes to verify production claim veracity (e.g., Redis cluster eviction, PostgreSQL optimistic locking, Kafka backpressure).

### 3. 🎙️ Pre-Flight Voice & Acoustic Calibration
* **16-Band Real-Time Audio Equalizer:** Visualizes live microphone frequency spectrum using Web Audio `AnalyserNode`.
* **Signal-to-Noise (SNR) Telemetry:** Detects room reverberation and ambient noise levels.
* **"Hear Yourself Back" Echo Test:** Records a 3-second candidate audio sample and loops playback through Web Audio filters for immediate mic confidence.

### 4. 📊 Candidate Performance Diagnostic Engine
* **Pacing Analytics (WPM):** Tracks speaking words-per-minute against the 125–155 WPM industry benchmark.
* **Linguistic Hesitation (Filler Words):** Analyzes conversational filler tokens (`um`, `uh`, `like`, `basically`, `actually`, `you know`).
* **Technical Vocabulary Extraction:** Evaluates depth across distributed systems, concurrency, ACID transactions, and database indexing.
* **Automated Scoring Rubric:** Computes *Technical Clarity*, *Communication Pacing*, *Depth of Answers*, and *Hiring Recommendation* (*Strong Hire*, *Hire*, *Leaning Hire*, *Needs Review*).
* **Instant Exports:** Download full session telemetry in structured `.json` or clean markdown `.txt`.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 16 (App Router)
* **Frontend Library:** React 19 (Concurrent Mode & Optimistic Transitions)
* **Styling:** Tailwind CSS v4 (Editorial Cream `#FAF8EE` & Obsidian Charcoal `#111815`)
* **Audio Processing:** Web Audio API (`AudioContext`, `AnalyserNode`, `MediaStreamAudioSourceNode`)
* **Speech Synthesis & STT:** Web Speech API (`SpeechSynthesisUtterance`, `webkitSpeechRecognition`)
* **Motion & Animations:** Framer Motion & Canvas Confetti
* **Icons:** Lucide React

```
                       ┌──────────────────────────────┐
                       │       Candidate Voice        │
                       └──────────────┬───────────────┘
                                      │ Microphone
                                      ▼
                       ┌──────────────────────────────┐
                       │  Web Audio Engine & Analyser │
                       │    (16-band FFT + VAD)       │
                       └──────────────┬───────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
┌───────────────────────────┐                   ┌───────────────────────────┐
│ Speech Recognition (STT)  │                   │ Barge-in & Latency Engine │
└─────────────┬─────────────┘                   └─────────────┬─────────────┘
              │                                               │
              └───────────────────────┬───────────────────────┘
                                      ▼
                       ┌──────────────────────────────┐
                       │ AI Question & Follow-up Bank │
                       │  (Resume Probes + STAR Bar)  │
                       └──────────────┬───────────────┘
                                      │
                                      ▼
                       ┌──────────────────────────────┐
                       │   Neural Speech Synthesis    │
                       │   (Nova / Echo / Alloy / Sh) │
                       └──────────────┬───────────────┘
                                      │
                                      ▼
                       ┌──────────────────────────────┐
                       │ Candidate Diagnostics Engine │
                       │  (WPM, Fillers, Tech Depth)  │
                       └──────────────────────────────┘
```

---

## 🏁 Quickstart & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/monushah108/mockpulse.git
cd mockpulse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Author & Creator

**Monu Shah**  
*Full-Stack & AI Systems Engineer*

* 🌐 **GitHub:** [@monushah108](https://github.com/monushah108)
* 💼 **LinkedIn:** [linkedin.com/in/monushah108](https://www.linkedin.com/in/monushah108)
* 🐦 **X (Twitter):** [@monushah108](https://x.com/monushah108)
* 📧 **Email:** [sonuk627422@gmail.com](mailto:sonuk627422@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
