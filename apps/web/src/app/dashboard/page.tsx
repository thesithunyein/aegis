"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldIcon,
  BrainIcon,
  DatabaseIcon,
  LinkIcon,
  WalletIcon,
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
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-sm w-full">
          <div className="text-center mb-8">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-14 w-14 mx-auto mb-4 rounded-2xl" />
            <h1 className="text-2xl font-bold tracking-tight mb-1 text-gray-900">Aegis</h1>
            <p className="text-sm text-gray-500">Autonomous Intelligence, Verified On-Chain</p>
          </div>

          <div className="card shadow-google-lg">
            <h2 className="text-base font-semibold mb-1.5 text-gray-900">Connect Your Wallet</h2>
            <p className="text-sm text-gray-500 mb-6">
              Connect to 0G Network to start managing your DeFi portfolio with verifiable AI.
            </p>
            <button
              onClick={() => setWalletConnected(true)}
              className="w-full btn-primary py-3"
            >
              <WalletIcon className="w-5 h-5" />
              Connect Wallet
            </button>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldIcon className="w-3.5 h-3.5" />
                <span>Connecting to 0G Galileo Testnet</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
              ← Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6 rounded-md" />
            <span className="text-sm font-semibold text-gray-900">Aegis</span>
            <span className="text-xs text-gray-300 font-mono">/</span>
            <span className="text-xs text-gray-400 font-mono">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
              <span className="status-dot status-online" />
              Agent Running
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-mono text-gray-500">
              0x1a2b...3c4d
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-0 mb-6 border-b border-gray-200">
          {[
            { id: "overview" as const, label: "Overview", icon: ChartIcon },
            { id: "decisions" as const, label: "Decisions", icon: BrainIcon },
            { id: "settings" as const, label: "Settings", icon: SettingsIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "tab-active"
                  : "tab-inactive"
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
              {/* Agent Card */}
              <div className="card shadow-google mb-5">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5 text-gray-900">{mockAgent.name}</h2>
                    <p className="text-sm text-gray-500">{mockAgent.strategy} • {mockAgent.riskTolerance} Risk</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                      <PauseIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                      <SettingsIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Decisions", value: mockAgent.totalDecisions, icon: BrainIcon },
                    { label: "Success Rate", value: `${mockAgent.successRate}%`, icon: CheckIcon },
                    { label: "Max Position", value: mockAgent.maxPosition, icon: ChartIcon },
                    { label: "Last Decision", value: mockAgent.lastDecision, icon: ClockIcon },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <stat.icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                      </div>
                      <div className="text-lg font-bold font-mono text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {[
                  { title: "New Agent", desc: "Deploy another agent", icon: PlusIcon, color: "blue" },
                  { title: "View History", desc: "All past decisions", icon: HistoryIcon, color: "purple" },
                  { title: "Verify Proof", desc: "Check TEE attestation", icon: ShieldIcon, color: "green" },
                ].map((item) => (
                  <button key={item.title} className="card flex items-center gap-3 hover:shadow-google-lg transition-all group text-left">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                      item.color === "green"
                        ? "bg-green-50 text-green-600 group-hover:bg-green-100"
                        : item.color === "purple"
                        ? "bg-purple-50 text-purple-600 group-hover:bg-purple-100"
                        : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <ChevronIcon className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
              </div>

              {/* Recent Decisions */}
              <div className="card shadow-google">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Recent Decisions</h3>
                  <button onClick={() => setActiveTab("decisions")} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {mockDecisions.slice(0, 3).map((decision) => (
                    <div key={decision.id} className="py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className={`status-dot ${decision.status === "executed" ? "status-online" : "status-offline"}`} />
                          <span className="text-sm font-medium text-gray-900">{decision.action}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {decision.verified && (
                            <span className="proof-badge">
                              <CheckIcon className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                          {decision.txHash && (
                            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                              {decision.txHash}
                              <ExternalLinkIcon className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 ml-5">{decision.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "decisions" && (
            <motion.div key="decisions" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="space-y-4">
                {mockDecisions.map((decision) => (
                  <div key={decision.id} className="card shadow-google hover:shadow-google-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`status-dot ${decision.status === "executed" ? "status-online" : "status-offline"}`} />
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{decision.action}</h3>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">{decision.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-0.5">Confidence</div>
                          <div className="text-sm font-mono font-semibold text-gray-900">{decision.confidence}%</div>
                        </div>
                        {decision.verified ? (
                          <span className="proof-badge"><CheckIcon className="w-3 h-3" /> Verified</span>
                        ) : (
                          <span className="badge badge-amber">
                            <ClockIcon className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BrainIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Agent Reasoning</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{decision.reasoning}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><DatabaseIcon className="w-3.5 h-3.5" /> 0G Storage</span>
                        <span className="flex items-center gap-1.5"><ZapIcon className="w-3.5 h-3.5" /> 0G Compute</span>
                      </div>
                      {decision.txHash && (
                        <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
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
                <div className="card shadow-google mb-5">
                  <h3 className="text-base font-semibold mb-4 text-gray-900">Agent Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Agent Name</label>
                      <input type="text" defaultValue="Aegis Alpha" className="input" />
                    </div>
                    <div>
                      <label className="label">Strategy</label>
                      <select className="select">
                        <option>Conservative Yield</option>
                        <option>Moderate Growth</option>
                        <option>Aggressive Alpha</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Max Position Size (%)</label>
                      <input type="number" defaultValue={5} min={1} max={25} className="input" />
                    </div>
                    <div>
                      <label className="label">Risk Tolerance</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Low", "Medium", "High"].map((level) => (
                          <button key={level} className={`px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors ${
                            level === "Low"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                          }`}>{level}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card shadow-google">
                  <h3 className="text-base font-semibold mb-4 text-gray-900">Agent Identity</h3>
                  <div className="space-y-3">
                    {[
                      { label: "ERC-7857 Token ID", value: "#0047" },
                      { label: "Contract Address", value: "0x9f66...2192", accent: true },
                      { label: "Network", value: "0G Galileo Testnet", online: true },
                    ].map((item, i) => (
                      <div key={item.label} className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <span className="text-sm text-gray-500">{item.label}</span>
                        {item.online ? (
                          <span className="flex items-center gap-2 text-sm text-gray-900">
                            <span className="status-dot status-online" />
                            {item.value}
                          </span>
                        ) : (
                          <span className={`text-sm font-mono ${item.accent ? "text-blue-600" : "text-gray-900"}`}>{item.value}</span>
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
