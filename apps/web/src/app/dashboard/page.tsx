"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldIcon,
  BrainIcon,
  DatabaseIcon,
  LinkIcon,
  WalletIcon,
  PlayIcon,
  PauseIcon,
  PlusIcon,
  HistoryIcon,
  SettingsIcon,
  ChevronIcon,
  ExternalLinkIcon,
  CheckIcon,
  ClockIcon,
  ZapIcon,
  ChartIcon,
} from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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
    reasoning: "ETH showing strong momentum on 4H timeframe. RSI at 62, not overbought. Increasing ETH allocation from 15% to 18% per risk parameters.",
    confidence: 87,
    status: "executed",
    txHash: "0x1a2b...3c4d",
    verified: true,
  },
  {
    id: 2,
    timestamp: "2026-08-28 13:45:12",
    action: "Claim AAVE rewards",
    reasoning: "Reward amount exceeds gas cost threshold (0.002 ETH). Optimal claiming window based on current gas prices.",
    confidence: 95,
    status: "executed",
    txHash: "0x5e6f...7g8h",
    verified: true,
  },
  {
    id: 3,
    timestamp: "2026-08-28 12:10:33",
    action: "Reduce UNI exposure",
    reasoning: "UNI approaching resistance at $12.50. Securing 8% gains before potential pullback. Will re-enter on support confirmation.",
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
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-md w-full">
          <div className="text-center mb-8">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-[#f0f6ff]">Aegis</h1>
            <p className="text-sm text-[#8899b4]">Autonomous Intelligence, Verified On-Chain</p>
          </div>

          <div className="bg-[#0d1321] border border-[#1a2540] p-8">
            <h2 className="text-lg font-semibold mb-2 text-[#f0f6ff]">Connect Your Wallet</h2>
            <p className="text-sm text-[#8899b4] mb-6">
              Connect to 0G Network to start managing your DeFi portfolio with verifiable AI.
            </p>
            <button
              onClick={() => setWalletConnected(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#f0f6ff] text-[#030712] text-base font-semibold hover:bg-[#f0f6ff]/90 transition-all duration-200"
            >
              <WalletIcon className="w-5 h-5" />
              Connect Wallet
            </button>
            <div className="mt-6 pt-6 border-t border-[#1a2540]">
              <div className="flex items-center gap-2 text-xs text-[#4a5d80]">
                <ShieldIcon className="w-4 h-4" />
                <span>Connecting to 0G Galileo Testnet</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-[#4a5d80] hover:text-[#f0f6ff] transition-colors duration-200">
              ← Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-2xl border-b border-[#1a2540]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6" />
            <span className="text-sm font-semibold text-[#f0f6ff]">Aegis</span>
            <span className="text-xs text-[#4a5d80] font-mono">/ Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-[#10b981]">
              <span className="status-dot status-online" />
              Agent Running
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1321] border border-[#1a2540] text-xs font-mono text-[#8899b4]">
              0x1a2b...3c4d
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-0 mb-8 border-b border-[#1a2540]">
          {[
            { id: "overview" as const, label: "Overview", icon: ChartIcon },
            { id: "decisions" as const, label: "Decisions", icon: BrainIcon },
            { id: "settings" as const, label: "Settings", icon: SettingsIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-[#06b6d4] text-[#f0f6ff]"
                  : "border-transparent text-[#4a5d80] hover:text-[#8899b4]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="bg-[#0d1321] border border-[#1a2540] p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1 text-[#f0f6ff]">{mockAgent.name}</h2>
                    <p className="text-sm text-[#8899b4]">{mockAgent.strategy} • {mockAgent.riskTolerance} Risk</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-[#030712] border border-[#1a2540] hover:border-[#243352] transition-colors text-[#8899b4] hover:text-[#f0f6ff]">
                      <PauseIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-[#030712] border border-[#1a2540] hover:border-[#243352] transition-colors text-[#8899b4] hover:text-[#f0f6ff]">
                      <SettingsIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1a2540]">
                  {[
                    { label: "Total Decisions", value: mockAgent.totalDecisions, icon: BrainIcon },
                    { label: "Success Rate", value: `${mockAgent.successRate}%`, icon: CheckIcon },
                    { label: "Max Position", value: mockAgent.maxPosition, icon: ChartIcon },
                    { label: "Last Decision", value: mockAgent.lastDecision, icon: ClockIcon },
                  ].map((stat, i) => (
                    <div key={stat.label} className={`p-4 ${i > 0 ? "border-l border-[#1a2540]" : ""}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-3.5 h-3.5 text-[#4a5d80]" />
                        <span className="text-xs text-[#4a5d80] uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <div className="text-lg font-bold font-mono text-[#f0f6ff]">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-0 mb-6">
                {[
                  { title: "New Agent", desc: "Deploy another agent", icon: PlusIcon, accent: "cyan" },
                  { title: "View History", desc: "All past decisions", icon: HistoryIcon, accent: "blue" },
                  { title: "Verify Proof", desc: "Check TEE attestation", icon: ShieldIcon, accent: "green" },
                ].map((item) => (
                  <button key={item.title} className="flex items-center gap-3 p-5 bg-[#0d1321] border border-[#1a2540] hover:border-[#243352] transition-all duration-200 group">
                    <div className={`w-10 h-10 flex items-center justify-center border transition-colors duration-300 ${
                      item.accent === "green"
                        ? "bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981] group-hover:border-[#10b981]/40"
                        : item.accent === "blue"
                        ? "bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6] group-hover:border-[#3b82f6]/40"
                        : "bg-[#06b6d4]/10 border-[#06b6d4]/20 text-[#06b6d4] group-hover:border-[#06b6d4]/40"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-[#f0f6ff]">{item.title}</div>
                      <div className="text-xs text-[#4a5d80]">{item.desc}</div>
                    </div>
                    <ChevronIcon className="w-4 h-4 text-[#4a5d80] ml-auto" />
                  </button>
                ))}
              </div>

              <div className="bg-[#0d1321] border border-[#1a2540]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2540]">
                  <h3 className="text-sm font-semibold text-[#f0f6ff]">Recent Decisions</h3>
                  <button onClick={() => setActiveTab("decisions")} className="text-xs text-[#06b6d4] hover:text-[#06b6d4]/80 transition-colors">
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-[#1a2540]">
                  {mockDecisions.slice(0, 3).map((decision) => (
                    <div key={decision.id} className="px-6 py-4 hover:bg-[#131b2e] transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`status-dot ${decision.status === "executed" ? "status-online" : "status-offline"}`} />
                          <span className="text-sm font-medium text-[#f0f6ff]">{decision.action}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {decision.verified && (
                            <span className="proof-badge">
                              <CheckIcon className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                          {decision.txHash && (
                            <a href="#" className="text-xs text-[#4a5d80] hover:text-[#f0f6ff] transition-colors flex items-center gap-1">
                              {decision.txHash}
                              <ExternalLinkIcon className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#4a5d80] line-clamp-2 ml-5">{decision.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "decisions" && (
            <motion.div key="decisions" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="space-y-0">
                {mockDecisions.map((decision) => (
                  <div key={decision.id} className="bg-[#0d1321] border border-[#1a2540] p-6 hover:border-[#243352] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`status-dot ${decision.status === "executed" ? "status-online" : "status-offline"}`} />
                        <div>
                          <h3 className="text-base font-semibold text-[#f0f6ff]">{decision.action}</h3>
                          <p className="text-xs text-[#4a5d80] font-mono mt-1">{decision.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-[#4a5d80] mb-1">Confidence</div>
                          <div className="text-sm font-mono font-semibold text-[#f0f6ff]">{decision.confidence}%</div>
                        </div>
                        {decision.verified ? (
                          <span className="proof-badge"><CheckIcon className="w-3 h-3" /> Verified</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-xs font-medium text-[#f59e0b] uppercase">
                            <ClockIcon className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#030712] border border-[#1a2540] p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BrainIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                        <span className="text-xs font-medium text-[#06b6d4] uppercase tracking-wider">Agent Reasoning</span>
                      </div>
                      <p className="text-sm text-[#8899b4] leading-relaxed">{decision.reasoning}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#4a5d80]">
                        <span className="flex items-center gap-1.5"><DatabaseIcon className="w-3.5 h-3.5" /> 0G Storage</span>
                        <span className="flex items-center gap-1.5"><ZapIcon className="w-3.5 h-3.5" /> 0G Compute</span>
                      </div>
                      {decision.txHash && (
                        <a href="#" className="text-xs text-[#06b6d4] hover:text-[#06b6d4]/80 transition-colors flex items-center gap-1">
                          View on Explorer <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div key="settings" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="max-w-2xl">
                <div className="bg-[#0d1321] border border-[#1a2540] p-6 mb-6">
                  <h3 className="text-base font-semibold mb-4 text-[#f0f6ff]">Agent Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-[#4a5d80] uppercase tracking-wider mb-2">Agent Name</label>
                      <input type="text" defaultValue="Aegis Alpha" className="w-full px-4 py-3 bg-[#030712] border border-[#1a2540] text-sm text-[#f0f6ff] focus:border-[#06b6d4] focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#4a5d80] uppercase tracking-wider mb-2">Strategy</label>
                      <select className="w-full px-4 py-3 bg-[#030712] border border-[#1a2540] text-sm text-[#f0f6ff] focus:border-[#06b6d4] focus:outline-none transition-colors">
                        <option>Conservative Yield</option>
                        <option>Moderate Growth</option>
                        <option>Aggressive Alpha</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#4a5d80] uppercase tracking-wider mb-2">Max Position Size (%)</label>
                      <input type="number" defaultValue={5} min={1} max={25} className="w-full px-4 py-3 bg-[#030712] border border-[#1a2540] text-sm text-[#f0f6ff] focus:border-[#06b6d4] focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#4a5d80] uppercase tracking-wider mb-2">Risk Tolerance</label>
                      <div className="grid grid-cols-3 gap-0">
                        {["Low", "Medium", "High"].map((level) => (
                          <button key={level} className={`px-4 py-3 text-sm font-medium border border-[#1a2540] transition-colors ${
                            level === "Low" ? "bg-[#f0f6ff] text-[#030712] border-[#f0f6ff]" : "bg-[#030712] text-[#4a5d80] hover:text-[#f0f6ff]"
                          }`}>{level}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d1321] border border-[#1a2540] p-6">
                  <h3 className="text-base font-semibold mb-4 text-[#f0f6ff]">Agent Identity</h3>
                  <div className="space-y-3">
                    {[
                      { label: "ERC-7857 Token ID", value: "#0047" },
                      { label: "Contract Address", value: "0x9f66...2192", accent: true },
                      { label: "Network", value: "0G Galileo Testnet", online: true },
                    ].map((item, i) => (
                      <div key={item.label} className={`flex items-center justify-between py-2 ${i > 0 ? "border-t border-[#1a2540]" : ""}`}>
                        <span className="text-sm text-[#8899b4]">{item.label}</span>
                        {item.online ? (
                          <span className="flex items-center gap-2 text-sm text-[#f0f6ff]">
                            <span className="status-dot status-online" />
                            {item.value}
                          </span>
                        ) : (
                          <span className={`text-sm font-mono ${item.accent ? "text-[#06b6d4]" : "text-[#f0f6ff]"}`}>{item.value}</span>
                        )}
                      </div>
                    ))}
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
