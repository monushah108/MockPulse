import { ResumeProfile, TranscriptItem, PostInterviewMetrics, QuestionCategory } from "../types/interview";

export const TARGET_ROLES = [
  "Full-Stack Engineer",
  "Frontend React Developer",
  "Backend Node.js Engineer",
  "AI/ML Infrastructure Specialist",
  "Cloud & DevOps Architect",
  "System Design Specialist",
];

export const EXPERIENCE_LEVELS = [
  "Intern (0-1 yrs)",
  "Junior (1-2 yrs)",
  "Mid-Level (3-5 yrs)",
  "Senior (5-8 yrs)",
  "Staff / Lead (8+ yrs)",
];

export const ROUND_TYPES = [
  "Round 1: Technical & Algorithms",
  "Round 2: System Architecture & Scalability",
  "Round 3: Behavioral & Engineering Leadership",
];

export const VOICE_MODELS = [
  "Nova (Warm & Conversational)",
  "Echo (Deep & Technical)",
  "Alloy (Balanced & Crisp)",
  "Shimmer (Expressive)",
] as const;

export const DEFAULT_RESUME: ResumeProfile = {
  fileName: "monu_shah_senior_fullstack.pdf",
  candidateName: "Monu Shah",
  targetRole: "Full-Stack Engineer",
  experienceLevel: "Mid-Level (3-5 yrs)",
  parsedSummary: "3 Projects Detected • 14 Core Skills • 96% Role Alignment",
  skillsCount: 14,
  projectsCount: 3,
  alignmentScore: 96,
  skills: [
    {
      category: "Frontend & UI",
      items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "WebSockets"],
    },
    {
      category: "Backend & Runtime",
      items: ["Node.js", "Express", "NestJS", "Go", "gRPC", "GraphQL", "REST APIs"],
    },
    {
      category: "Databases & Storage",
      items: ["PostgreSQL", "Redis", "Prisma ORM", "Vector DB (pgvector)", "MongoDB"],
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "Kubernetes", "AWS (ECS, S3, CloudFront)", "CI/CD (GitHub Actions)", "Kafka"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Distributed Real-Time Collaboration Canvas",
      description: "Low-latency whiteboard supporting 10,000+ concurrent websocket sessions with conflict-free replicated data types (CRDTs).",
      technologies: ["Next.js", "WebSockets", "Redis Pub/Sub", "TypeScript", "Canvas API"],
      probedInQuestion: 2,
      highlight: "Reduced sync collision rate to 0.02% using Yjs CRDTs and Redis cluster sharding.",
    },
    {
      id: "proj-2",
      name: "High-Throughput Payment & Ledger Engine",
      description: "Idempotent microservice handling 4,500 transactions/sec with zero double-spend anomalies across multi-region instances.",
      technologies: ["Node.js", "PostgreSQL", "Kafka", "Docker", "AWS ECS"],
      probedInQuestion: 4,
      highlight: "Implemented strict distributed pessimistic locks with 80ms p99 response time.",
    },
    {
      id: "proj-3",
      name: "AI Document Intelligence & RAG Agent",
      description: "Vector search retrieval pipeline parsing enterprise PDFs with hybrid BM25 and semantic vector reranking.",
      technologies: ["Python", "FastAPI", "pgvector", "LangChain", "OpenAI API"],
      highlight: "Achieved 91% contextual relevance on domain-specific engineering schemas.",
    },
  ],
  coveredTopics: [
    {
      id: "topic-1",
      topic: "Concurrent State Management & React 19 Hydration",
      status: "covered",
      round: "Round 1: Technical",
    },
    {
      id: "topic-2",
      topic: "WebSockets vs Server-Sent Events (Distributed Canvas)",
      status: "covered",
      round: "Round 1: Technical",
    },
    {
      id: "topic-3",
      topic: "Redis Cluster Eviction Policies & Pub/Sub backpressure",
      status: "in-progress",
      round: "Round 1: Technical",
    },
    {
      id: "topic-4",
      topic: "Database Idempotency & Two-Phase Commit Trade-offs",
      status: "pending",
      round: "Round 1: Technical",
    },
    {
      id: "topic-5",
      topic: "Production Incident Triage & Blameless Post-Mortem",
      status: "pending",
      round: "Round 1: Technical",
    },
  ],
};

export const INITIAL_TRANSCRIPT_DIALOGUES: TranscriptItem[] = [
  {
    id: "tx-1",
    speaker: "ai",
    text: "Hello Monu! Welcome to your MockPulse technical interview for the Full-Stack Engineer role. I noticed from your resume that you built a distributed real-time canvas and an idempotent ledger service. To kick things off, how do you handle state synchronization across clients when network partitions or latency spikes occur?",
    timestamp: "00:00:14",
    category: "Architecture",
    feedbackTags: ["Clear Problem Framing", "Resume Context Anchored"],
  },
  {
    id: "tx-2",
    speaker: "candidate",
    text: "Thanks for having me! In my real-time collaboration canvas project, we opted for CRDTs—specifically Yjs over WebSockets. Rather than relying on central server locks which degrade under high jitter, each client maintains a local state vector and applies operations optimistically. When updates arrive out of order, the causal tree resolves automatically without rollbacks.",
    timestamp: "00:00:46",
    category: "Architecture",
    latencyMs: 580,
    feedbackTags: ["High Technical Precision", "Strong CRDT Knowledge", "Direct Resume Alignment"],
  },
  {
    id: "tx-3",
    speaker: "ai",
    text: "That's an elegant solution. But let's press on scale: as user count grows to thousands in a single canvas room, your Redis Pub/Sub broadcast traffic can exhibit an O(N²) explosion. How would you architect backpressure and channel partitioning to prevent connection saturation?",
    timestamp: "00:01:25",
    category: "System Design",
    feedbackTags: ["Scale Pressure Test", "Redis Bottleneck Probe"],
  },
  {
    id: "tx-4",
    speaker: "candidate",
    text: "Great question. We tackled this by decoupling the high-frequency mouse telemetry from structural canvas delta events. For cursor positions, we throttled client emissions to 30ms and used ephemeral UDP-like lossy channels. For persistent document deltas, we partitioned rooms across Redis Streams with consumer groups, batching deltas into compressed binary frames before pushing down the WebSocket edge.",
    timestamp: "00:02:18",
    category: "System Design",
    latencyMs: 640,
    feedbackTags: ["Bandwidth Optimization", "Batching & Compression Strategy", "Nuanced Trade-off Awareness"],
  },
  {
    id: "tx-5",
    speaker: "ai",
    text: "Excellent breakdown of transport semantics. Let's switch gears to backend consistency. In your High-Throughput Ledger engine, you mentioned handling 4,500 transactions per second without double spends. If a database primary experiences a failover mid-transaction, how do you guarantee idempotency without locking out subsequent valid customer transactions?",
    timestamp: "00:03:02",
    category: "Algorithm",
    feedbackTags: ["Consistency Guarantee", "Distributed Transaction Probe"],
  },
  {
    id: "tx-6",
    speaker: "candidate",
    text: "We enforced a two-tier idempotency key pattern. Every client request generates a deterministic SHA-256 idempotency token which is checked in Redis using atomic SETNX with a 120-second lease before hitting Postgres. On the database tier, we leverage row-level locking via SELECT FOR UPDATE with unique natural constraint indexes. If a primary fails, the replica catches up via write-ahead logs, and retried requests with the same key safely return the cached transaction receipt instead of re-executing.",
    timestamp: "00:04:12",
    category: "Algorithm",
    latencyMs: 610,
    feedbackTags: ["Atomic Primitive SETNX", "WAL Replication Awareness", "Defensive Fault Tolerance"],
  },
];

export const MOCK_NEXT_QUESTIONS: {
  category: QuestionCategory;
  aiQuestion: string;
  candidateAnswer: string;
  probeProject?: string;
  feedbackTags: string[];
}[] = [
  {
    category: "Coding",
    aiQuestion:
      "Looking closely at your frontend stack with React 19 and Next.js: with Server Actions and concurrent transitions, how do you prevent race conditions when two optimistic mutations resolve out of order on the UI?",
    candidateAnswer:
      "In React 19, we utilize useOptimistic tied to a unique mutation sequence identifier. By tracking timestamped revision epochs, any out-of-order resolution simply discards stale payloads instead of overwriting the latest optimistic snapshot.",
    feedbackTags: ["React 19 Concurrency", "Optimistic State Epochs"],
  },
  {
    category: "Behavioral",
    aiQuestion:
      "Can you walk me through a situation where you had a deep disagreement with a senior engineer or architect regarding a technology choice, and how you navigated it to a productive outcome?",
    candidateAnswer:
      "During our ledger rewrite, our architect championed Apache Cassandra for pure write throughput, while I advocated for Postgres with horizontal partition sharding to preserve strict ACID compliance for audit trails. Rather than debating opinions, I created a reproducible benchmark suite simulating double-spend race conditions under network partitions. The data showed Postgres delivered 99.999% consistency with minimal throughput loss, so we unanimously aligned on Postgres.",
    feedbackTags: ["STAR Framework", "Data-Driven Persuasion", "Blameless Collaboration"],
  },
  {
    category: "System Design",
    aiQuestion:
      "If we were to scale MockPulse's voice processing to 50,000 concurrent live voice sessions with under 500ms end-to-end latency, what would your global edge audio pipeline look like?",
    candidateAnswer:
      "I would terminate WebRTC audio sessions at Anycast edge PoPs close to the user using Cloudflare Workers or AWS Global Accelerator. The edge converts raw Opus streams into chunked PCM audio and streams directly into our regional inference workers via gRPC HTTP/2 multiplexing, minimizing TCP handshakes and maintaining sub-300ms transport latency.",
    feedbackTags: ["Anycast Edge Architecture", "WebRTC & gRPC Streaming", "Low Latency Optimization"],
  },
];

export const SAMPLE_POST_REPORT: PostInterviewMetrics = {
  overallScore: 89,
  recommendation: "Strong Hire",
  technicalClarity: 92,
  communicationPacing: 86,
  depthOfAnswers: 89,
  wpm: 144,
  fillerWords: 3,
  avgLatencyMs: 615,
  dialogueCount: 6,
  totalDurationSeconds: 278,
  strengths: [
    "Outstanding mastery of distributed systems (CRDTs, Redis Streams, and atomic SETNX idempotency locks).",
    "Deeply grounded answers in real-world engineering project experience from the candidate's resume.",
    "Fluid communication pacing with crisp technical terminology and structured problem-solving.",
    "Proactively highlighted architectural trade-offs (e.g. lossy telemetry channels vs lossless persistent document deltas).",
  ],
  improvements: [
    "Could elaborate slightly more on edge failure modes during Postgres replication lag before jumping to client caching.",
    "Consider explicitly stating memory overhead trade-offs when keeping extensive CRDT historical tombstones.",
  ],
};
