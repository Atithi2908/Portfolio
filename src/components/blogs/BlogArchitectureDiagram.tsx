"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, 
  Database, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Activity,
  Bell,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";

type ArchitectureStage = 
  | "simplest" 
  | "async-sdk" 
  | "rabbitmq-queue" 
  | "time-buckets" 
  | "alert-state" 
  | "final-architecture" 
  | "scale-10x";

interface Props {
  initialStage?: ArchitectureStage;
}

export const BlogArchitectureDiagram: React.FC<Props> = ({ initialStage = "final-architecture" }) => {
  const [activeStage, setActiveStage] = useState<ArchitectureStage>(initialStage);

  const stages: { id: ArchitectureStage; title: string; badge: string }[] = [
    { id: "simplest", title: "1. Synchronous Flow", badge: "Naive Design" },
    { id: "async-sdk", title: "2. Non-blocking SDK", badge: "Low Latency" },
    { id: "rabbitmq-queue", title: "3. RabbitMQ Buffer", badge: "Queue Decoupling" },
    { id: "time-buckets", title: "4. Time Buckets", badge: "DB Aggregation" },
    { id: "alert-state", title: "5. Stateful Alerts", badge: "State Machine" },
    { id: "final-architecture", title: "6. Production Flow", badge: "End-to-End" },
    { id: "scale-10x", title: "7. 10× Scaled Architecture", badge: "High Capacity" },
  ];

  return (
    <div className="my-8 rounded-2xl border border-[#3d332a] bg-[#17120e]/90 p-5 md:p-6 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* Header & Stage Switcher Tabs */}
      <div className="flex flex-col gap-4 border-b border-[#2e261f] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4A373]/10 border border-[#D4A373]/30 text-[#D4A373]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                Interactive System Design Evolution
              </h4>
              <p className="text-xs text-[#a89f91]">
                Select an architecture phase to inspect component flow & bottlenecks
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#241c15] border border-[#D4A373]/40 px-3 py-1 text-xs font-mono text-[#E6CCB2]">
            <Activity className="w-3.5 h-3.5 text-[#D4A373] animate-pulse" />
            <span>Interactive Diagram</span>
          </span>
        </div>

        {/* Stage Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-[#D4A373] text-[#120e0a] font-bold shadow-md shadow-[#D4A373]/20 border border-[#D4A373]"
                    : "bg-[#1c1713] text-[#b8ad9e] hover:text-white hover:bg-[#282019] border border-[#332a22]"
                }`}
              >
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Diagram Canvas */}
      <div className="relative mt-6 min-h-[300px] rounded-xl bg-[#0f0c0a] border border-[#2b231c] p-6 flex flex-col justify-center items-center overflow-x-auto">
        <AnimatePresence mode="wait">
          {activeStage === "simplest" && (
            <motion.div
              key="simplest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-wrap items-center justify-center gap-4 py-6"
            >
              <DiagramNode title="Client Request" subtitle="HTTP GET /orders" color="cyan" />
              <FlowArrow label="Blocks App" warning />
              <DiagramNode title="Host Backend" subtitle="Executes API Logic" color="amber" />
              <FlowArrow label="Sync POST /metrics" warning />
              <DiagramNode title="Monitoring Server" subtitle="Writes directly to DB" color="rose" />
              <FlowArrow label="SQL Insert" />
              <DiagramNode title="PostgreSQL" subtitle="Raw Metric Row" color="purple" />
            </motion.div>
          )}

          {activeStage === "async-sdk" && (
            <motion.div
              key="async-sdk"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col items-center justify-center gap-6 py-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-4">
                <DiagramNode title="Client" subtitle="Gets immediate 200 OK" color="emerald" />
                <FlowArrow label="1. Response Sent" />
                <DiagramNode title="Host Backend" subtitle="Express `finish` event" color="amber" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 border-t border-dashed border-[#3d332a] pt-6 w-full max-w-xl">
                <div className="px-3 py-1 bg-[#1a140f] border border-[#D4A373]/40 rounded-lg text-xs font-mono text-[#D4A373]">
                  ⚡ 2. Non-blocking Async Fetch (Unawaited)
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                <DiagramNode title="Monitoring API" subtitle="Receives Telemetry" color="cyan" />
              </div>
            </motion.div>
          )}

          {activeStage === "rabbitmq-queue" && (
            <motion.div
              key="rabbitmq-queue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-wrap items-center justify-center gap-3 md:gap-4 py-6"
            >
              <DiagramNode title="Host Application" subtitle="Non-blocking SDK" color="emerald" />
              <FlowArrow label="1-2ms POST" />
              <DiagramNode title="Monitoring API" subtitle="Stateless Producer" color="cyan" />
              <FlowArrow label="Publish msg" />
              <DiagramNode title="RabbitMQ Queue" subtitle="Buffer 10k msgs" color="amber" glowing />
              <FlowArrow label="Consume ACK" />
              <DiagramNode title="Worker Pool" subtitle="Async Workers (W1..W3)" color="purple" />
              <FlowArrow label="Batch Write" />
              <DiagramNode title="PostgreSQL" subtitle="Decoupled Store" color="emerald" />
            </motion.div>
          )}

          {activeStage === "time-buckets" && (
            <motion.div
              key="time-buckets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col items-center gap-4 py-4"
            >
              <div className="text-center space-y-1 mb-2">
                <span className="text-xs font-mono text-[#D4A373]">PostgreSQL Rollup Pipeline</span>
                <h5 className="text-sm font-bold text-white">Pre-Aggregated Data Tiering</h5>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 w-full max-w-2xl">
                <RollupBox title="Raw Metrics" desc="Retained 7 days" detail="Per-request rows" highlight="border-rose-500/40 bg-rose-950/20" />
                <RollupBox title="1-Min Rollups" desc="P95, Avg, Count" detail="Minutes table" highlight="border-amber-500/40 bg-amber-950/20" />
                <RollupBox title="1-Hour Rollups" desc="Hourly trends" detail="Hourly table" highlight="border-cyan-500/40 bg-cyan-950/20" />
                <RollupBox title="1-Day Rollups" desc="Long term SLA" detail="Daily table" highlight="border-emerald-500/40 bg-emerald-950/20" />
              </div>
            </motion.div>
          )}

          {activeStage === "alert-state" && (
            <motion.div
              key="alert-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col items-center gap-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <StateBadge state="NORMAL" desc="Metric < 500ms" active />
                <ArrowRight className="w-4 h-4 text-[#a89f91]" />
                <StateBadge state="THRESHOLD BREACHED" desc="Metric > 500ms" active warning />
                <ArrowRight className="w-4 h-4 text-[#a89f91]" />
                <StateBadge state="TRIGGERED" desc="🚨 Slack Alert Sent" active alert />
              </div>
              <div className="p-3 rounded-xl bg-[#1c1713] border border-[#382d24] max-w-lg text-center mt-2">
                <p className="text-xs font-mono text-[#c2b6a6]">
                  ⚡ <strong className="text-white">State Machine Rule:</strong> While state remains <code className="text-[#D4A373]">TRIGGERED</code>, subsequent cron checks suppress new Slack notifications. When latency drops back down, state transitions to <code className="text-emerald-400">NORMAL</code> and sends a single <strong className="text-emerald-400">✅ Resolved</strong> notification.
                </p>
              </div>
            </motion.div>
          )}

          {activeStage === "final-architecture" && (
            <motion.div
              key="final-architecture"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4"
            >
              <DiagramNode title="Host Apps" subtitle="Non-blocking SDK" color="cyan" />
              <FlowArrow label="POST" />
              <DiagramNode title="Load Balancer" subtitle="AWS ALB / NGINX" color="amber" />
              <FlowArrow label="Route" />
              <DiagramNode title="Stateless APIs" subtitle="Metrics Ingest" color="purple" />
              <FlowArrow label="Queue" />
              <DiagramNode title="RabbitMQ Queue" subtitle="AMQP Buffer" color="amber" glowing />
              <FlowArrow label="Consume" />
              <DiagramNode title="Worker Pool" subtitle="Parallel Workers" color="emerald" />
              <FlowArrow label="Rollups" />
              <DiagramNode title="PostgreSQL DB" subtitle="Raw + Rollups" color="cyan" />
            </motion.div>
          )}

          {activeStage === "scale-10x" && (
            <motion.div
              key="scale-10x"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col items-center gap-5 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <ScaleLever title="1. SDK In-Memory Batching" desc="Flush 100 msgs or 3s interval" stat="99% less HTTP calls" color="border-emerald-500/40 bg-emerald-950/20" />
                <ScaleLever title="2. Stateless API Pool" desc="Scaled behind Load Balancer" stat="10k+ req/sec capacity" color="border-cyan-500/40 bg-cyan-950/20" />
                <ScaleLever title="3. Parallel Worker Swarm" desc="Scale from 3 to 15 workers" stat="Zero queue backlog" color="border-amber-500/40 bg-amber-950/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Notes */}
      <div className="mt-4 flex items-center justify-between text-xs text-[#a89f91] font-mono border-t border-[#2e261f] pt-3">
        <span>Phase: <strong className="text-white capitalize">{activeStage.replace("-", " ")}</strong></span>
        <span className="text-[#D4A373]">Architecting for Resilience &amp; Zero Latency</span>
      </div>
    </div>
  );
};

/* Helper Visual Sub-Components */

const DiagramNode: React.FC<{ title: string; subtitle: string; color: "cyan" | "amber" | "rose" | "purple" | "emerald"; glowing?: boolean }> = ({
  title,
  subtitle,
  color,
  glowing = false
}) => {
  const colorMap = {
    cyan: "border-cyan-500/50 bg-cyan-950/30 text-cyan-200",
    amber: "border-[#D4A373]/60 bg-[#261d15] text-[#F5EBE0]",
    rose: "border-rose-500/50 bg-rose-950/30 text-rose-200",
    purple: "border-purple-500/50 bg-purple-950/30 text-purple-200",
    emerald: "border-emerald-500/50 bg-emerald-950/30 text-emerald-200",
  };

  return (
    <div className={`px-4 py-3 rounded-xl border text-center transition-all ${colorMap[color]} ${glowing ? "shadow-lg shadow-[#D4A373]/20 ring-1 ring-[#D4A373]/40" : ""}`}>
      <div className="font-mono font-bold text-xs sm:text-sm">{title}</div>
      <div className="text-[11px] opacity-80 font-mono mt-0.5">{subtitle}</div>
    </div>
  );
};

const FlowArrow: React.FC<{ label?: string; warning?: boolean }> = ({ label, warning = false }) => (
  <div className="flex flex-col items-center px-1">
    {label && (
      <span className={`text-[10px] font-mono mb-1 ${warning ? "text-rose-400 font-bold" : "text-[#a89f91]"}`}>
        {label}
      </span>
    )}
    <ArrowRight className={`w-4 h-4 ${warning ? "text-rose-400" : "text-[#D4A373]"}`} />
  </div>
);

const RollupBox: React.FC<{ title: string; desc: string; detail: string; highlight: string }> = ({
  title,
  desc,
  detail,
  highlight,
}) => (
  <div className={`p-3 rounded-xl border text-center space-y-1 ${highlight}`}>
    <div className="font-mono font-bold text-xs text-white">{title}</div>
    <div className="text-[11px] text-[#d4c9b8] font-mono">{desc}</div>
    <div className="text-[10px] text-[#a89f91] font-mono">{detail}</div>
  </div>
);

const StateBadge: React.FC<{ state: string; desc: string; active?: boolean; warning?: boolean; alert?: boolean }> = ({
  state,
  desc,
  warning = false,
  alert = false,
}) => (
  <div className={`p-3 rounded-xl border text-center ${
    alert ? "border-rose-500/60 bg-rose-950/40 text-rose-200" :
    warning ? "border-amber-500/60 bg-amber-950/40 text-amber-200" :
    "border-emerald-500/60 bg-emerald-950/40 text-emerald-200"
  }`}>
    <div className="font-mono font-bold text-xs">{state}</div>
    <div className="text-[11px] opacity-80 font-mono mt-0.5">{desc}</div>
  </div>
);

const ScaleLever: React.FC<{ title: string; desc: string; stat: string; color: string }> = ({ title, desc, stat, color }) => (
  <div className={`p-4 rounded-xl border space-y-1.5 ${color}`}>
    <div className="font-mono font-bold text-xs text-white">{title}</div>
    <div className="text-xs text-[#d6cdbf] font-mono">{desc}</div>
    <div className="inline-block pt-1 text-[11px] font-mono font-bold text-[#D4A373]">
      ⚡ Impact: {stat}
    </div>
  </div>
);
