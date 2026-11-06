export type AppScreen = "setup" | "live" | "report";

export type OrbState = "ai_speaking" | "listening" | "thinking" | "idle";

export type QuestionCategory = "Algorithm" | "Architecture" | "Behavioral" | "System Design" | "Coding";

export interface TranscriptItem {
  id: string;
  speaker: "ai" | "candidate";
  text: string;
  timestamp: string;
  category?: QuestionCategory;
  isStreaming?: boolean;
  feedbackTags?: string[];
  latencyMs?: number;
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  probedInQuestion?: number;
  highlight: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeProfile {
  fileName: string;
  candidateName: string;
  targetRole: string;
  experienceLevel: string;
  parsedSummary: string;
  skillsCount: number;
  projectsCount: number;
  alignmentScore: number;
  skills: SkillCategory[];
  projects: ResumeProject[];
  coveredTopics: {
    id: string;
    topic: string;
    status: "covered" | "in-progress" | "pending";
    round: string;
  }[];
}

export interface InterviewSettings {
  targetRole: string;
  experienceLevel: string;
  roundType: string;
  voiceModel: "Nova (Warm & Conversational)" | "Echo (Deep & Technical)" | "Alloy (Balanced & Crisp)" | "Shimmer (Expressive)";
  audioInputDevice: string;
  bargeInEnabled: boolean;
  noiseSuppression: boolean;
  speed: number;
}

export interface PostInterviewMetrics {
  overallScore: number;
  recommendation: "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Review";
  technicalClarity: number;
  communicationPacing: number;
  depthOfAnswers: number;
  wpm: number;
  fillerWords: number;
  avgLatencyMs: number;
  strengths: string[];
  improvements: string[];
  dialogueCount: number;
  totalDurationSeconds: number;
  fillerDetails?: { word: string; count: number }[];
  detectedTechKeywords?: string[];
  speakingDurationFormatted?: string;
  idealWpmRange?: string;
  turnDiagnostics?: {
    turnNumber: number;
    questionExcerpt: string;
    category: string;
    candidateExcerpt: string;
    wordsSpoken: number;
    fillersDetected: string[];
    technicalKeywordsFound: string[];
    score: number;
    critique: string;
  }[];
  categoryBreakdown?: {
    category: string;
    score: number;
    feedback: string;
  }[];
}

