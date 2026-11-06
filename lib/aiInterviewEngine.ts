"use client";

import { QuestionCategory, ResumeProfile, ResumeProject } from "../types/interview";

export interface AIInterviewQuestion {
  id: string;
  category: QuestionCategory;
  aiQuestion: string;
  expectedKeywords: string[];
  suggestedAnswer: string;
  roleTags: string[];
  feedbackTags: string[];
}

// Comprehensive Senior Engineering Question Bank by Role & Round
export const QUESTION_BANK: AIInterviewQuestion[] = [
  // FULL-STACK ENGINEER TRACK
  {
    id: "fs-1",
    category: "Architecture",
    aiQuestion:
      "When designing a high-concurrency Full-Stack application with Next.js and a microservices backend, how do you handle state synchronization and cache invalidation between server components, edge caches, and client state?",
    expectedKeywords: ["cache invalidation", "stale-while-revalidate", "server actions", "redis", "optimistic updates"],
    suggestedAnswer:
      "We implement a multi-tier caching strategy. At the edge, we use Stale-While-Revalidate with tagged cache keys. For Server Components, we leverage React cache and Next.js revalidateTag triggered via server actions. When state changes, we invalidate specific tag partitions and push optimistic UI deltas to the client.",
    roleTags: ["Full-Stack Engineer", "Frontend React Developer"],
    feedbackTags: ["Cache Invalidation Strategy", "Server Actions", "Edge Consistency"],
  },
  {
    id: "fs-2",
    category: "Coding",
    aiQuestion:
      "In modern React 19 with Server Actions and concurrent transitions, how do you prevent race conditions when two optimistic mutations resolve out of order on the client UI?",
    expectedKeywords: ["useOptimistic", "mutation epoch", "versioning", "rollback", "reconciliation"],
    suggestedAnswer:
      "In React 19, we utilize useOptimistic coupled with a deterministic monotonic version identifier or timestamp epoch. Any out-of-order resolved payload whose revision is older than the currently active UI state is silently discarded instead of overwriting newer mutations.",
    roleTags: ["Full-Stack Engineer", "Frontend React Developer"],
    feedbackTags: ["React 19 Concurrency", "Optimistic State Epochs", "Race Condition Prevention"],
  },
  {
    id: "fs-3",
    category: "System Design",
    aiQuestion:
      "Let's talk about real-time communication: when scaling a collaborative live application from hundreds to 50,000 concurrent WebSocket sessions, what architectural bottlenecks emerge in Redis Pub/Sub, and how would you resolve them?",
    expectedKeywords: ["backpressure", "redis streams", "fanout", "sharding", "binary frames", "connection pooling"],
    suggestedAnswer:
      "With high fan-out, native Redis Pub/Sub experiences an O(N*M) message multiplication causing buffer saturation. We resolve this by partitioning rooms across Redis Streams with consumer groups, throttling high-frequency events at the client, and batching binary Protobuf frames across edge gateway clusters.",
    roleTags: ["Full-Stack Engineer", "Backend Node.js Engineer", "System Design Specialist"],
    feedbackTags: ["WebSocket Scalability", "Redis Stream Consumer Groups", "Backpressure Handling"],
  },
  {
    id: "fs-4",
    category: "Algorithm",
    aiQuestion:
      "In a high-throughput transactional ledger, how do you guarantee idempotency across distributed worker nodes if a primary database node crashes midway through transaction execution?",
    expectedKeywords: ["idempotency key", "two-phase commit", "wal", "distributed lock", "atomic setnx", "select for update"],
    suggestedAnswer:
      "We enforce a two-tier idempotency key pattern. Every client request generates a deterministic UUID or SHA-256 token checked via atomic Redis SETNX with a lease. On the database tier, we use unique natural constraint indexes and pessimistic row locks via SELECT FOR UPDATE, catching up from write-ahead logs upon failover.",
    roleTags: ["Full-Stack Engineer", "Backend Node.js Engineer"],
    feedbackTags: ["Distributed Transactions", "Idempotency Primitives", "Database Failover Recovery"],
  },

  // FRONTEND REACT DEVELOPER TRACK
  {
    id: "fe-1",
    category: "Coding",
    aiQuestion:
      "Can you deep-dive into how React's Fiber reconciler schedules priority work, and how the new Concurrent Mode Lane architecture differs from the traditional stack reconciler when handling heavy render trees?",
    expectedKeywords: ["fiber tree", "lanes", "time-slicing", "requestIdleCallback", "priority queue", "cooperative scheduling"],
    suggestedAnswer:
      "The stack reconciler was synchronous and recursive, blocking the main thread during deep tree diffs. Fiber decomposes reconciliation into discrete work units with a two-phase process: a cooperative, interruptible render phase and a synchronous commit phase. The 31-bit Lane architecture allows React to prioritize urgent user interactions over background data fetching.",
    roleTags: ["Frontend React Developer", "Full-Stack Engineer"],
    feedbackTags: ["React Fiber Architecture", "Lane Priority Scheduling", "Time-Slicing Mechanics"],
  },
  {
    id: "fe-2",
    category: "Architecture",
    aiQuestion:
      "When optimizing Core Web Vitals for an enterprise e-commerce platform, what specific strategies do you use to diagnose and reduce Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS)?",
    expectedKeywords: ["INP", "CLS", "long tasks", "yield to main thread", "scheduler.yield", "aspect-ratio", "content-visibility"],
    suggestedAnswer:
      "For INP, we break up long JavaScript tasks (>50ms) using scheduler.yield() or requestAnimationFrame, defer non-critical analytics, and use CSS contain-intrinsic-size. For CLS, we reserve explicit aspect-ratio sizing on media and avoid injecting dynamic DOM elements above existing viewport content.",
    roleTags: ["Frontend React Developer"],
    feedbackTags: ["Core Web Vitals", "INP Optimization", "Main Thread Deferral"],
  },

  // BACKEND NODE.JS & GO TRACK
  {
    id: "be-1",
    category: "Architecture",
    aiQuestion:
      "In Node.js, how does the libuv event loop handle thread pool offloading for filesystem I/O versus network I/O, and what occurs under the hood when your worker pool becomes exhausted?",
    expectedKeywords: ["libuv", "thread pool", "epoll", "kqueue", "UV_THREADPOOL_SIZE", "microtask queue", "event loop lag"],
    suggestedAnswer:
      "Network I/O utilizes non-blocking OS primitives like epoll on Linux or kqueue on macOS, operating entirely on the main event loop thread without worker threads. However, filesystem and DNS lookups are synchronous at the OS level, so libuv offloads them to its internal thread pool (default size 4). When exhausted, file read operations queue up, producing severe event loop lag.",
    roleTags: ["Backend Node.js Engineer", "Full-Stack Engineer"],
    feedbackTags: ["Libuv Internal Mechanics", "Thread Pool Exhaustion", "Non-blocking OS Primitives"],
  },
  {
    id: "be-2",
    category: "System Design",
    aiQuestion:
      "When designing a distributed event-driven pipeline handling 100,000 events per second, how do you decide between Apache Kafka and RabbitMQ, and how do you prevent consumer lag from causing data loss?",
    expectedKeywords: ["kafka", "rabbitmq", "partitioning", "commit offset", "dead-letter queue", "backpressure", "pull vs push"],
    suggestedAnswer:
      "Kafka uses a persistent partitioned commit log with a pull model, ideal for high-throughput replayability and event sourcing. RabbitMQ uses an in-memory push model with smart broker routing. To prevent lag in Kafka, we scale consumer partitions, tune batch fetch sizes, and route unparseable poison pills into Dead Letter Queues (DLQ).",
    roleTags: ["Backend Node.js Engineer", "System Design Specialist"],
    feedbackTags: ["Kafka vs RabbitMQ Trade-offs", "Consumer Partition Scaling", "Dead-Letter Queue Resilience"],
  },

  // SYSTEM DESIGN SPECIALIST TRACK
  {
    id: "sd-1",
    category: "System Design",
    aiQuestion:
      "How would you architect a distributed Rate Limiter capable of evaluating millions of API requests per second with sub-5 millisecond response times and high availability across multiple AWS regions?",
    expectedKeywords: ["token bucket", "sliding window log", "redis cluster", "local memory cache", "consistent hashing", "eventual consistency"],
    suggestedAnswer:
      "We implement a hybrid two-tier Token Bucket rate limiter. Each regional edge node maintains an in-memory local counter synchronized asynchronously with a centralized Redis Cluster using Lua scripts for atomic increments. Under network partitions, regional nodes fail open with local token allowances to prevent blocking legitimate traffic.",
    roleTags: ["System Design Specialist", "Backend Node.js Engineer", "Full-Stack Engineer"],
    feedbackTags: ["Rate Limiter Design", "Redis Lua Script Atomicity", "Cross-Region Partition Tolerance"],
  },
  {
    id: "sd-2",
    category: "System Design",
    aiQuestion:
      "In a distributed database cluster, explain how Consistent Hashing with virtual nodes solves the hotspot problem when adding or removing database storage nodes dynamically.",
    expectedKeywords: ["consistent hashing", "hash ring", "virtual nodes", "vnodes", "rebalancing", "replication factor"],
    suggestedAnswer:
      "Traditional modulo hashing (hash(key) % N) causes near-total key migration when node count N changes. Consistent Hashing maps both keys and node identifiers onto a 2^32 cyclic ring. By assigning multiple virtual nodes (vnodes) to each physical server, key distribution is smoothed out uniformly, minimizing rebalancing overhead to only K/N keys during membership changes.",
    roleTags: ["System Design Specialist", "Backend Node.js Engineer"],
    feedbackTags: ["Consistent Hashing Ring", "Virtual Nodes Uniformity", "Zero-Downtime Rebalancing"],
  },

  // BEHAVIORAL & ENGINEERING LEADERSHIP TRACK
  {
    id: "beh-1",
    category: "Behavioral",
    aiQuestion:
      "Tell me about a high-severity production outage you were involved in. How did you triage the root cause under pressure, and what structural changes did you introduce to ensure it never reoccurred?",
    expectedKeywords: ["incident triage", "blameless postmortem", "root cause", "telemetry", "circuit breaker", "monitoring"],
    suggestedAnswer:
      "During a traffic surge, our payment webhook gateway cascaded into memory exhaustion due to slow downstream third-party responses. I stepped in as incident commander, rolled back to the previous stable release, and temporarily shed non-critical traffic. In our blameless post-mortem, we implemented automated circuit breakers, request timeouts, and exponential backoff retry jitter.",
    roleTags: ["Full-Stack Engineer", "Frontend React Developer", "Backend Node.js Engineer", "System Design Specialist"],
    feedbackTags: ["STAR Framework", "Blameless Post-Mortem", "Resilient Production Incident Triage"],
  },
  {
    id: "beh-2",
    category: "Behavioral",
    aiQuestion:
      "Walk me through a situation where you had a deep architectural disagreement with a principal engineer or tech lead. How did you navigate the conversation without creating friction?",
    expectedKeywords: ["data-driven", "prototyping", "trade-offs", "persuasion", "consensus", "stakeholder management"],
    suggestedAnswer:
      "During an architecture review, our lead favored Apache Cassandra for pure write throughput, while I advocated for partitioned Postgres to maintain strict ACID constraints for audit compliance. Instead of debating opinions, I created an isolated benchmark reproducing write contention and network partition failure scenarios. The reproducible data demonstrated Postgres satisfied throughput requirements with zero audit risks, leading to team consensus.",
    roleTags: ["Full-Stack Engineer", "Backend Node.js Engineer", "System Design Specialist"],
    feedbackTags: ["Collaborative Persuasion", "Empirical Prototyping", "Technical Consensus Building"],
  },
];

// Contextual Resume Probe Generator
export function generateResumeProbeQuestion(resume: ResumeProfile): AIInterviewQuestion {
  const project = resume.projects[0];
  const primaryTech = project?.technologies?.[0] || "distributed architectures";
  const projectName = project?.name || "your primary engineering project";

  return {
    id: `resume-probe-${Date.now()}`,
    category: "Architecture",
    aiQuestion: `Looking at your resume, you spearheaded the architecture for "${projectName}" using ${primaryTech}. When scaling this system under high concurrent load, how did you handle data consistency, and what was the single biggest bottleneck you had to overcome?`,
    expectedKeywords: ["scalability", "concurrency", "consistency", "latency", primaryTech.toLowerCase()],
    suggestedAnswer: `In "${projectName}", our primary bottleneck was connection pool saturation during peak traffic. We resolved this by introducing an asynchronous queue and sharding our data layer, ensuring sub-100ms response times.`,
    roleTags: [resume.targetRole],
    feedbackTags: ["Resume Project Deep Dive", "Architecture Probing", "Real-World Engineering Justification"],
  };
}

// Adaptive Follow-up Question Generator based on Candidate's Answer Content
export function generateSmartFollowUp(
  candidateAnswer: string,
  lastQuestion: string,
  resume: ResumeProfile
): AIInterviewQuestion {
  const lower = candidateAnswer.toLowerCase();

  if (lower.includes("redis") || lower.includes("cache") || lower.includes("caching")) {
    return {
      id: `fu-cache-${Date.now()}`,
      category: "System Design",
      aiQuestion:
        "You highlighted caching with Redis. What specific strategy do you employ to prevent cache stampedes (the thundering herd problem) when a critical cached key expires under thousands of concurrent requests?",
      expectedKeywords: ["mutex lock", "probabilistic early expiration", "background refresh", "singleflight"],
      suggestedAnswer:
        "We mitigate cache stampedes using mutual exclusion locks (singleflight pattern) or probabilistic early recomputation (XFetch algorithm) to recompute the value in the background before full expiration.",
      roleTags: [resume.targetRole],
      feedbackTags: ["Thundering Herd Mitigation", "Cache Stampede Defense", "Advanced Concurrency"],
    };
  }

  if (lower.includes("database") || lower.includes("postgres") || lower.includes("sql") || lower.includes("migration")) {
    return {
      id: `fu-db-${Date.now()}`,
      category: "Architecture",
      aiQuestion:
        "That database architecture makes sense. But how do you execute zero-downtime database schema migrations when tables contain tens of millions of records without holding table-level write locks?",
      expectedKeywords: ["expand and contract", "concurrent index creation", "dual writes", "zero downtime"],
      suggestedAnswer:
        "We utilize the Expand and Contract pattern: add new columns with nullable constraints, dual-write to both schemas via application layer, backfill data in batches, and finally drop the legacy column.",
      roleTags: [resume.targetRole],
      feedbackTags: ["Zero-Downtime Migrations", "Table Locking Mitigation", "Expand-Contract Pattern"],
    };
  }

  if (lower.includes("websocket") || lower.includes("webrtc") || lower.includes("socket") || lower.includes("stream")) {
    return {
      id: `fu-socket-${Date.now()}`,
      category: "System Design",
      aiQuestion:
        "On real-time streaming: how do you detect and handle network disconnects or intermittent packet loss on mobile clients to ensure messages are not duplicated upon automatic reconnection?",
      expectedKeywords: ["heartbeat", "ping pong", "ack", "message sequencing", "replay buffer", "idempotent client id"],
      suggestedAnswer:
        "We maintain application-level ping-pong heartbeats with exponential backoff reconnection. Each message includes a monotonic sequence ID; when reconnecting, the client sends its last acknowledged sequence number to replay missing deltas.",
      roleTags: [resume.targetRole],
      feedbackTags: ["Network Reconnection Resilience", "Message Sequencing", "Heartbeat Handshakes"],
    };
  }

  // Default dynamic probe
  return {
    id: `fu-tradeoff-${Date.now()}`,
    category: "Architecture",
    aiQuestion:
      "That is a clear technical explanation. If you were forced to cut your cloud infrastructure costs by 50% tomorrow without degrading p99 user latency, which architectural trade-offs would you make first?",
    expectedKeywords: ["cost optimization", "profiling", "serverless", "cold storage", "network egress"],
    suggestedAnswer:
      "I would analyze network egress and database query profiling first, moving rarely accessed historical records to cold S3 tiers, consolidating idle container instances, and aggressively caching static API payloads at edge CDNs.",
    roleTags: [resume.targetRole],
    feedbackTags: ["Cost vs Latency Trade-Offs", "Resource Optimization", "Production Pragmatism"],
  };
}

// Select a randomized question matching the candidate's track and round
export function getNextInterviewQuestion(
  role: string,
  roundType: string,
  resume: ResumeProfile,
  askedIds: string[],
  turnCount: number
): AIInterviewQuestion {
  // Turn 1: Always ask a tailored question from their resume project
  if (turnCount === 0 && resume.projects.length > 0) {
    return generateResumeProbeQuestion(resume);
  }

  // Filter pool matching role
  const matchingPool = QUESTION_BANK.filter(
    (q) => !askedIds.includes(q.id) && (q.roleTags.includes(role) || q.roleTags.includes("Full-Stack Engineer"))
  );

  if (matchingPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingPool.length);
    return matchingPool[randomIndex];
  }

  // Fallback to any unasked question
  const remaining = QUESTION_BANK.filter((q) => !askedIds.includes(q.id));
  if (remaining.length > 0) {
    return remaining[Math.floor(Math.random() * remaining.length)];
  }

  // If all asked, generate dynamic probe
  return generateResumeProbeQuestion(resume);
}

// REAL AI SPEECH SYNTHESIS ENGINE (SPEAKING)
export function speakWithAIVoice(
  text: string,
  voiceModel: string = "Nova",
  onStart?: () => void,
  onWord?: (word: string, currentText: string) => void,
  onEnd?: () => void,
  speedMultiplier: number = 1.0
): () => void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    if (onStart) onStart();
    const fallbackMs = Math.max(1200, (text.split(" ").length * 280) / Math.max(0.6, speedMultiplier));
    setTimeout(() => {
      if (onEnd) onEnd();
    }, fallbackMs);
    return () => {};
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  // Map chosen voice model to natural voice options
  const isFemale = voiceModel.includes("Nova") || voiceModel.includes("Shimmer");
  const isDeep = voiceModel.includes("Echo");

  const preferredVoice = voices.find((v) => {
    const name = v.name.toLowerCase();
    if (isDeep) return name.includes("david") || name.includes("guy") || name.includes("male");
    if (isFemale) return name.includes("samantha") || name.includes("zira") || name.includes("female") || name.includes("natural");
    return v.lang.startsWith("en");
  }) || voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  // Tune pitch and base rate according to model
  let baseRate = 1.0;
  if (voiceModel.includes("Nova")) {
    utterance.pitch = 1.05;
    baseRate = 1.02;
  } else if (voiceModel.includes("Echo")) {
    utterance.pitch = 0.92;
    baseRate = 0.98;
  } else if (voiceModel.includes("Shimmer")) {
    utterance.pitch = 1.12;
    baseRate = 1.05;
  } else {
    utterance.pitch = 1.0;
    baseRate = 1.0;
  }

  // Apply speed multiplier bounded to Web Speech API supported limits (0.6x to 2.0x)
  utterance.rate = Math.max(0.6, Math.min(2.0, baseRate * (speedMultiplier || 1.0)));

  let words = text.split(" ");
  let wordIndex = 0;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onboundary = (event) => {
    if (event.name === "word") {
      wordIndex++;
      const currentStream = words.slice(0, Math.min(words.length, wordIndex + 1)).join(" ");
      if (onWord) onWord(words[wordIndex] || "", currentStream);
    }
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);

  // Return cancel function for interruption
  return () => {
    window.speechSynthesis.cancel();
  };
}

// REAL SPEECH-TO-TEXT ENGINE (LISTENING TO CANDIDATE)
// Uses Web Speech API SpeechRecognition with fallback
export function createCandidateSpeechRecognition(
  onTranscriptChange: (transcript: string, isFinal: boolean) => void,
  onSpeechDetected?: () => void
): { start: () => void; stop: () => void; isSupported: boolean } {
  if (typeof window === "undefined") {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

  const SpeechRecognition =
    (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event: any) => {
    if (onSpeechDetected) onSpeechDetected();

    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = (finalTranscript + " " + interimTranscript).trim();
    onTranscriptChange(currentText, finalTranscript.length > 0);
  };

  let isStarted = false;

  return {
    isSupported: true,
    start: () => {
      try {
        if (!isStarted) {
          recognition.start();
          isStarted = true;
        }
      } catch {
        // Safe catch if already started
      }
    },
    stop: () => {
      try {
        if (isStarted) {
          recognition.stop();
          isStarted = false;
        }
      } catch {
        // Safe catch
      }
    },
  };
}

