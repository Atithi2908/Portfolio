import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profileData } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profileData.name} | ${profileData.role}`,
  description: `${profileData.positioning} - Portfolio of ${profileData.name}, specializing in autonomous AI agents, distributed telemetry pipelines, and real-time systems.`,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/avatar.png", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Atithi Jaiman",
    "AI Engineer",
    "Systems Engineer",
    "LangGraph",
    "LangChain",
    "Autonomous Agents",
    "Distributed Systems",
    "RabbitMQ",
    "Redis",
    "PostgreSQL",
    "LeetCode Knight",
    "IIIT Dharwad",
  ],
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  openGraph: {
    title: `${profileData.name} | ${profileData.role}`,
    description: profileData.positioning,
    url: "https://atithijaiman.dev",
    siteName: `${profileData.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | ${profileData.role}`,
    description: profileData.positioning,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-zinc-100 min-h-screen selection:bg-brand-cyan/20 selection:text-brand-cyan`}
      >
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
        <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
