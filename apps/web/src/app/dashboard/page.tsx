"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Play,
  Pause,
  Plus,
  Shield,
  Brain,
  Database,
  Link2,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Settings,
  History,
  BarChart3,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Mock data for demo
const mockAgent = {
  name: "Aegis Alpha",
  status: "running" as const,
  strategy: "Conservative Yield",
  riskTolerance: "Low",
  maxPosition: "5%",
  totalDecisions: 47,
  successRate: 94,
  lastDecision: "2 minutes ago",
};

const mockDecisions = [
  {
    id: 1,
    timestamp: "2026-08-28 14:23:01",
    action: "Rebalance ETH/USDC position",
    reasoning:
      "ETH showing strong momentum on 4H timeframe. RSI at 62, not overbought. Increasing ETH allocation from 15% to 18% per risk parameters.",
    confidence: 87,
    status: "executed",
    txHash: "0x1a2b...3c4d",
    verified: true,
  },
  {
    id: 2,
    timestamp: "2026-08-28 13:45:12",
    action: "Claim AAVE rewards",
    reasoning:
      "Reward amount exceeds gas cost threshold (0.002 ETH). Optimal claiming window based on current gas prices.",
    confidence: 95,
    status: "executed",
    txHash: "0x5e6f...7g8h",
    verified: true,
  },
  {
    id: 3,
    timestamp: "2026-08-28 12:10:33",
    action: "Reduce UNI exposure",
    reasoning:
      "UNI approaching resistance at $12.50. Securing 8% gains before potential pullback. Will re-enter on support confirmation.",
    confidence: 72,
    status: "pending",
    txHash: null,
    verified: false,
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "decisions" | "settings">("overview");
  const [walletConnected, setWalletConnected] = useState(false);

  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-aegis-black flex items-center justify-center px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/logos/aegis-logo-transparent.png"
              alt="Aegis"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold tracking-tight mb-2">Aegis</h1>
            <p className="text-sm text-aegis-muted">
              Autonomous Intelligence, Verified On-Chain
            </p>
          </div>

          {/* Connect Card */}
          <div className="bg-aegis-card border border-aegis-border p-8">
            <h2 className="text-lg font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-sm text-aegis-muted mb-6">
              Connect to 0G Network to start managing your DeFi portfolio with
              verifiable AI.
            </p>

            <button
              onClick={() => setWalletConnected(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-aegis-white text-aegis-black text-base font-semibold hover:bg-aegis-white/90 transition-all"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>

            <div className="mt-6 pt-6 border-t border-aegis-border">
              <div className="flex items-center gap-2 text-xs text-aegis-dim">
                <Shield className="w-4 h-4" />
                <span>Connecting to 0G Galileo Testnet</span>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-aegis-muted hover:text-aegis-white transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aegis-black">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-aegis-black/80 backdrop-blur-sm border-b border-aegis-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logos/aegis-logo-transparent.png"
              alt="Aegis"
              className="h-6 w-6"
            />
            <span className="text-sm font-semibold">Aegis</span>
            <span className="text-xs text-aegis-dim font-mono">/ Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-aegis-green">
              <span className="status-dot status-online" />
              Agent Running
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-aegis-surface border border-aegis-border text-xs font-mono">
              0x1a2b...3c4d
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-0 mb-8 border-b border-aegis-border">
          {[
            { id: "overview" as const, label: "Overview", icon: BarChart3 },
            { id: "decisions" as const, label: "Decisions", icon: Brain },
            { id: "settings" as const, label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-aegis-white text-aegis-white"
                  : "border-transparent text-aegis-muted hover:text-aegis-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {/* Agent Status Card */}
              <div className="bg-aegis-card border border-aegis-border p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{mockAgent.name}</h2>
                    <p className="text-sm text-aegis-muted">
                      {mockAgent.strategy} • {mockAgent.riskTolerance} Risk
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-aegis-surface border border-aegis-border hover:border-aegis-border-hover transition-colors">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-aegis-surface border border-aegis-border hover:border-aegis-border-hover transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-aegis-border">
                  {[
                    {
                      label: "Total Decisions",
                      value: mockAgent.totalDecisions,
                      icon: Brain,
                    },
                    {
                      label: "Success Rate",
                      value: `${mockAgent.successRate}%`,
                      icon: CheckCircle2,
                    },
                    {
                      label: "Max Position",
                      value: mockAgent.maxPosition,
                      icon: BarChart3,
                    },
                    {
                      label: "Last Decision",
                      value: mockAgent.lastDecision,
                      icon: Clock,
                    },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`p-4 ${
                        i > 0 ? "border-l border-aegis-border" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-3.5 h-3.5 text-aegis-dim" />
                        <span className="text-xs text-aegis-dim uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-lg font-bold font-mono">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-0 mb-6">
                <button className="flex items-center gap-3 p-5 bg-aegis-card border border-aegis-border hover:border-aegis-border-hover transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-aegis-surface border border-aegis-border group-hover:border-aegis-blue transition-colors">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">New Agent</div>
                    <div className="text-xs text-aegis-muted">
                      Deploy another agent
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-aegis-dim ml-auto" />
                </button>

                <button className="flex items-center gap-3 p-5 bg-aegis-card border border-aegis-border hover:border-aegis-border-hover transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-aegis-surface border border-aegis-border group-hover:border-aegis-green transition-colors">
                    <History className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">View History</div>
                    <div className="text-xs text-aegis-muted">
                      All past decisions
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-aegis-dim ml-auto" />
                </button>

                <button className="flex items-center gap-3 p-5 bg-aegis-card border border-aegis-border hover:border-aegis-border-hover transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-aegis-surface border border-aegis-border group-hover:border-aegis-blue transition-colors">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">Verify Proof</div>
                    <div className="text-xs text-aegis-muted">
                      Check TEE attestation
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-aegis-dim ml-auto" />
                </button>
              </div>

              {/* Recent Decisions Preview */}
              <div className="bg-aegis-card border border-aegis-border">
                <div className="flex items-center justify-between px-6 py-4 border-b border-aegis-border">
                  <h3 className="text-sm font-semibold">Recent Decisions</h3>
                  <button
                    onClick={() => setActiveTab("decisions")}
                    className="text-xs text-aegis-muted hover:text-aegis-white transition-colors"
                  >
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-aegis-border">
                  {mockDecisions.slice(0, 3).map((decision) => (
                    <div
                      key={decision.id}
                      className="px-6 py-4 hover:bg-aegis-hover transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`status-dot ${
                              decision.status === "executed"
                                ? "status-online"
                                : "status-offline"
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {decision.action}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {decision.verified && (
                            <span className="proof-badge">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                          {decision.txHash && (
                            <a
                              href="#"
                              className="text-xs text-aegis-muted hover:text-aegis-white transition-colors flex items-center gap-1"
                            >
                              {decision.txHash}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-aegis-muted line-clamp-2 ml-5">
                        {decision.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Decisions Tab */}
          {activeTab === "decisions" && (
            <motion.div
              key="decisions"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="space-y-0">
                {mockDecisions.map((decision) => (
                  <div
                    key={decision.id}
                    className="bg-aegis-card border border-aegis-border p-6 hover:border-aegis-border-hover transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`status-dot ${
                            decision.status === "executed"
                              ? "status-online"
                              : "status-offline"
                          }`}
                        />
                        <div>
                          <h3 className="text-base font-semibold">
                            {decision.action}
                          </h3>
                          <p className="text-xs text-aegis-dim font-mono mt-1">
                            {decision.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-aegis-dim mb-1">
                            Confidence
                          </div>
                          <div className="text-sm font-mono font-semibold">
                            {decision.confidence}%
                          </div>
                        </div>
                        {decision.verified ? (
                          <span className="proof-badge">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-aegis-amber/10 border border-aegis-amber/20 text-xs font-medium text-aegis-amber uppercase">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-aegis-surface border border-aegis-border p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-3.5 h-3.5 text-aegis-blue" />
                        <span className="text-xs font-medium text-aegis-blue uppercase tracking-wider">
                          Agent Reasoning
                        </span>
                      </div>
                      <p className="text-sm text-aegis-muted leading-relaxed">
                        {decision.reasoning}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-aegis-dim">
                        <span className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5" />
                          Stored on 0G Storage
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Inference via 0G Compute
                        </span>
                      </div>
                      {decision.txHash && (
                        <a
                          href="#"
                          className="text-xs text-aegis-muted hover:text-aegis-white transition-colors flex items-center gap-1"
                        >
                          View on Explorer
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="max-w-2xl">
                <div className="bg-aegis-card border border-aegis-border p-6 mb-6">
                  <h3 className="text-base font-semibold mb-4">
                    Agent Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-aegis-dim uppercase tracking-wider mb-2">
                        Agent Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Aegis Alpha"
                        className="w-full px-4 py-3 bg-aegis-surface border border-aegis-border text-sm text-aegis-white focus:border-aegis-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-aegis-dim uppercase tracking-wider mb-2">
                        Strategy
                      </label>
                      <select className="w-full px-4 py-3 bg-aegis-surface border border-aegis-border text-sm text-aegis-white focus:border-aegis-blue focus:outline-none transition-colors">
                        <option>Conservative Yield</option>
                        <option>Moderate Growth</option>
                        <option>Aggressive Alpha</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-aegis-dim uppercase tracking-wider mb-2">
                        Max Position Size (%)
                      </label>
                      <input
                        type="number"
                        defaultValue={5}
                        min={1}
                        max={25}
                        className="w-full px-4 py-3 bg-aegis-surface border border-aegis-border text-sm text-aegis-white focus:border-aegis-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-aegis-dim uppercase tracking-wider mb-2">
                        Risk Tolerance
                      </label>
                      <div className="grid grid-cols-3 gap-0">
                        {["Low", "Medium", "High"].map((level) => (
                          <button
                            key={level}
                            className={`px-4 py-3 text-sm font-medium border border-aegis-border transition-colors ${
                              level === "Low"
                                ? "bg-aegis-white text-aegis-black border-aegis-white"
                                : "bg-aegis-surface text-aegis-muted hover:text-aegis-white"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-aegis-card border border-aegis-border p-6">
                  <h3 className="text-base font-semibold mb-4">
                    Agent Identity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-aegis-muted">
                        ERC-7857 Token ID
                      </span>
                      <span className="text-sm font-mono">#0047</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-aegis-border">
                      <span className="text-sm text-aegis-muted">
                        Contract Address
                      </span>
                      <span className="text-sm font-mono text-aegis-blue">
                        0x9f66...2192
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-aegis-border">
                      <span className="text-sm text-aegis-muted">
                        Network
                      </span>
                      <span className="flex items-center gap-2 text-sm">
                        <span className="status-dot status-online" />
                        0G Galileo Testnet
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
