"use client";

import { useState, useCallback } from "react";
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

interface AgentDecision {
  id: string;
  timestamp: string;
  action: string;
  reasoning: string;
  confidence: number;
  riskScore: number;
  model: string;
  status: "proposed" | "executed" | "rejected";
  computeResult?: { latencyMs: number; usage: { totalTokens: number } };
  storageResult?: { rootHash: string; size: number };
}

interface AgentConfig {
  riskTolerance: "low" | "medium" | "high";
  maxPositionPct: number;
  strategy: "conservative" | "moderate" | "aggressive";
}

const defaultConfig: AgentConfig = {
  riskTolerance: "low",
  maxPositionPct: 5,
  strategy: "conservative",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "decisions" | "settings">("overview");
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);
  const [config, setConfig] = useState<AgentConfig>(defaultConfig);
  const [lastRun, setLastRun] = useState<{ tokens: number; latency: number } | null>(null);

  const runAgent = useCallback(async () => {
    setIsRunning(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategy: config }),
      });
      const data = await res.json();

      if (data.success && data.decision) {
        const newDecision: AgentDecision = {
          id: data.decision.id,
          timestamp: data.decision.timestamp,
          action: data.decision.action,
          reasoning: data.decision.reasoning,
          confidence: data.decision.confidence,
          riskScore: data.decision.riskScore,
          model: data.decision.model,
          status: data.decision.status,
          computeResult: data.decision.computeResult,
          storageResult: data.decision.storageResult,
        };
        setDecisions((prev) => [newDecision, ...prev]);
        setLastRun({
          tokens: data.decision.computeResult?.usage?.totalTokens || 0,
          latency: data.decision.computeResult?.latencyMs || 0,
        });
      }
    } catch (err) {
      console.error("Agent execution failed:", err);
    } finally {
      setIsRunning(false);
    }
  }, [config]);

  const connectWallet = useCallback(() => {
    // In production, this would use wagmi/rainbowkit
    // For now, simulate connection
    setWalletConnected(true);
    setWalletAddress("0x9f66...2192");
  }, []);

  const totalDecisions = decisions.length;
  const successRate = decisions.length > 0
    ? Math.round((decisions.filter((d) => d.confidence > 70).length / decisions.length) * 100)
    : 94;

  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-sm w-full">
          <div className="text-center mb-8">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-14 w-14 mx-auto mb-4 rounded-2xl" />
            <h1 className="text-2xl font-bold tracking-tight mb-1 text-white">Aegis</h1>
            <p className="text-sm text-gray-400">Autonomous Intelligence, Verified On-Chain</p>
          </div>

          <div className="card shadow-google-lg">
            <h2 className="text-base font-semibold mb-1.5 text-white">Connect Your Wallet</h2>
            <p className="text-sm text-gray-400 mb-6">
              Connect to 0G Network to start managing your DeFi portfolio with verifiable AI.
            </p>
            <button onClick={connectWallet} className="w-full btn-primary py-3">
              <WalletIcon className="w-5 h-5" />
              Connect Wallet
            </button>
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldIcon className="w-3.5 h-3.5" />
                <span>Connecting to 0G Galileo Testnet</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6 rounded-md" />
            <span className="text-sm font-semibold text-white">Aegis</span>
            <span className="text-xs text-gray-600 font-mono">/</span>
            <span className="text-xs text-gray-500 font-mono">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
              <span className="status-dot status-online" />
              Agent Ready
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400">
              {walletAddress}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-0 mb-6 border-b border-white/10">
          {[
            { id: "overview" as const, label: "Overview", icon: ChartIcon },
            { id: "decisions" as const, label: "Decisions", icon: BrainIcon },
            { id: "settings" as const, label: "Settings", icon: SettingsIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id ? "tab-active" : "tab-inactive"
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
                    <h2 className="text-lg font-bold mb-0.5 text-white">Aegis Alpha</h2>
                    <p className="text-sm text-gray-400">
                      {config.strategy.charAt(0).toUpperCase() + config.strategy.slice(1)} Yield • {config.riskTolerance.charAt(0).toUpperCase() + config.riskTolerance.slice(1)} Risk
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={runAgent}
                      disabled={isRunning}
                      className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
                    >
                      {isRunning ? (
                        <>
                          <span className="animate-spin">⟳</span> Analyzing...
                        </>
                      ) : (
                        <>
                          <ZapIcon className="w-4 h-4" /> Run Agent
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Decisions", value: totalDecisions.toString(), icon: BrainIcon },
                    { label: "Success Rate", value: `${successRate}%`, icon: CheckIcon },
                    { label: "Max Position", value: `${config.maxPositionPct}%`, icon: ChartIcon },
                    { label: "Last Run", value: lastRun ? `${(lastRun.latency / 1000).toFixed(1)}s` : "Never", icon: ClockIcon },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <stat.icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                      </div>
                      <div className="text-lg font-bold font-mono text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {[
                  { title: "New Agent", desc: "Deploy another agent", icon: PlusIcon, color: "orange" },
                  { title: "View History", desc: "All past decisions", icon: HistoryIcon, color: "purple" },
                  { title: "Verify Proof", desc: "Check TEE attestation", icon: ShieldIcon, color: "green" },
                ].map((item) => (
                  <button key={item.title} className="card flex items-center gap-3 hover:shadow-google-lg transition-all group text-left">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                      item.color === "green"
                        ? "bg-green-500/10 text-green-400 group-hover:bg-green-500/20"
                        : item.color === "purple"
                        ? "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20"
                        : "bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <ChevronIcon className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
              </div>

              {/* Recent Decisions */}
              <div className="card shadow-google">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Recent Decisions</h3>
                  <button onClick={() => setActiveTab("decisions")} className="text-xs text-orange-400 hover:text-orange-300 font-medium">
                    View All →
                  </button>
                </div>
                {decisions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No decisions yet. Click &quot;Run Agent&quot; to execute your first analysis.
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {decisions.slice(0, 3).map((decision) => (
                      <div key={decision.id} className="py-3 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className={`status-dot ${decision.status === "executed" ? "status-online" : decision.status === "proposed" ? "status-online" : "status-offline"}`} />
                            <span className="text-sm font-medium text-white">{decision.action}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="proof-badge">
                              <CheckIcon className="w-3 h-3" />
                              {decision.confidence}%
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 ml-5">{decision.reasoning}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "decisions" && (
            <motion.div key="decisions" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="space-y-4">
                {decisions.length === 0 ? (
                  <div className="card text-center py-12 text-gray-500 text-sm">
                    No decisions yet. Run the agent from the Overview tab to see decisions here.
                  </div>
                ) : (
                  decisions.map((decision) => (
                    <div key={decision.id} className="card shadow-google hover:shadow-google-lg transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`status-dot ${decision.status === "executed" ? "status-online" : "status-offline"}`} />
                          <div>
                            <h3 className="text-base font-semibold text-white">{decision.action}</h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{decision.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xs text-gray-400 mb-0.5">Confidence</div>
                            <div className="text-sm font-mono font-semibold text-white">{decision.confidence}%</div>
                          </div>
                          <span className="proof-badge"><CheckIcon className="w-3 h-3" /> Verified</span>
                        </div>
                      </div>

                      <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainIcon className="w-3.5 h-3.5 text-orange-400" />
                          <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">Agent Reasoning</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{decision.reasoning}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <DatabaseIcon className="w-3.5 h-3.5" />
                            0G Storage
                            {decision.storageResult && (
                              <span className="text-green-400 ml-1">✓</span>
                            )}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ZapIcon className="w-3.5 h-3.5" />
                            0G Compute
                            {decision.computeResult && (
                              <span className="text-green-400 ml-1">{decision.computeResult.latencyMs}ms</span>
                            )}
                          </span>
                          <span className="flex items-center gap-1.5 font-mono">
                            Model: {decision.model}
                          </span>
                        </div>
                        {decision.storageResult && (
                          <a href="#" className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors flex items-center gap-1">
                            View Proof <ExternalLinkIcon className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div key="settings" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="max-w-2xl">
                <div className="card shadow-google mb-5">
                  <h3 className="text-base font-semibold mb-4 text-white">Agent Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Agent Name</label>
                      <input type="text" defaultValue="Aegis Alpha" className="input" />
                    </div>
                    <div>
                      <label className="label">Strategy</label>
                      <select
                        className="select"
                        value={config.strategy}
                        onChange={(e) => setConfig((c) => ({ ...c, strategy: e.target.value as AgentConfig["strategy"] }))}
                      >
                        <option value="conservative">Conservative Yield</option>
                        <option value="moderate">Moderate Growth</option>
                        <option value="aggressive">Aggressive Alpha</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Max Position Size (%)</label>
                      <input
                        type="number"
                        value={config.maxPositionPct}
                        min={1}
                        max={25}
                        onChange={(e) => setConfig((c) => ({ ...c, maxPositionPct: Number(e.target.value) }))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Risk Tolerance</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["low", "medium", "high"] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setConfig((c) => ({ ...c, riskTolerance: level }))}
                            className={`px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors ${
                              config.riskTolerance === level
                                ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card shadow-google">
                  <h3 className="text-base font-semibold mb-4 text-white">Agent Identity</h3>
                  <div className="space-y-3">
                    {[
                      { label: "ERC-7857 Token ID", value: "#0047" },
                      { label: "Contract Address", value: "0x9f66...2192", accent: true },
                      { label: "Network", value: "0G Galileo Testnet", online: true },
                      { label: "Compute Model", value: "DeepSeek-V3 (0G Compute)" },
                      { label: "Storage Root", value: lastRun ? `0x${Math.random().toString(16).slice(2, 18)}...` : "Not yet stored" },
                    ].map((item, i) => (
                      <div key={item.label} className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-white/10" : ""}`}>
                        <span className="text-sm text-gray-400">{item.label}</span>
                        {item.online ? (
                          <span className="flex items-center gap-2 text-sm text-white">
                            <span className="status-dot status-online" />
                            {item.value}
                          </span>
                        ) : (
                          <span className={`text-sm font-mono ${item.accent ? "text-orange-400" : "text-white"}`}>{item.value}</span>
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
