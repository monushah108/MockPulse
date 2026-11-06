import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MockPulse | Sub-Second Latency Real-Time AI Voice Mock Interviews",
  description:
    "AI Interviewer to get your dream tech job. Real-time conversational voice mock interviews with instant interruption handling, resume-tailored architecture questions, and deep diagnostic scoring. Engineered by Monu Shah (@monushah108).",
  authors: [{ name: "Monu Shah", url: "https://github.com/monushah108" }],
  creator: "Monu Shah",
  publisher: "Monu Shah",
  keywords: [
    "MockPulse",
    "Monu Shah",
    "AI Voice Interview",
    "Real-time Speech Synthesis",
    "Full-Stack Mock Interview",
    "System Design Interview",
    "Next.js 16",
    "React 19",
  ],
  openGraph: {
    title: "MockPulse | Real-Time AI Voice Mock Interviews by Monu Shah",
    description:
      "Sub-Second Latency Real-Time AI Voice Mock Interview Agent engineered by Monu Shah (@monushah108).",
    url: "https://github.com/monushah108/mockpulse",
    siteName: "MockPulse by Monu Shah",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8EE] text-[#111815] selection:bg-yellow-200 selection:text-black">
        {children}
      </body>
    </html>
  );
}
