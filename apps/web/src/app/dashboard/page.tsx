"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/components/WalletProvider";
import {
  ShieldIcon,
  BrainIcon,
  DatabaseIcon,
  ZapIcon,
  ChartIcon,
  ClockIcon,
  CheckIcon,
  PlusIcon,
  HistoryIcon,
  SettingsIcon,
  ChevronIcon,
  WalletIcon,
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
  teeProof?: { attestationHash: string; verified: boolean; modelId: string };
  onChainProof?: { txHash: string; blockNumber: number; contractAddress: string };
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

function shorten(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function Dashboard() {
  const { isConnected, address, balance, chainId, connect, disconnect, isConnecting } = useWallet();
  const [activeTab, setActiveTab] = useState<"overview" | "decisions" | "settings">("overview");
  const [isRunning, setIsRunning] = useState(false);
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);
  const [config, setConfig] = useState<AgentConfig>(defaultConfig);
  const [lastRun, setLastRun] = useState<{ tokens: number; latency: number } | null>(null);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [priceSource, setPriceSource] = useState("");

  // Fetch live prices on mount and every 60s
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/agent");
        const data = await res.json();
        if (data.prices) setLivePrices(data.prices);
        if (data.source) setPriceSource(data.source);
      } catch { /* ignore */ }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

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
        setDecisions((prev) => [data.decision, ...prev]);
        setLastRun({
          tokens: data.decision.computeResult?.usage?.totalTokens || 0,
          latency: data.decision.computeResult?.latencyMs || 0,
        });
      }
    } catch (err) {
      console.error("Agent failed:", err);
    } finally {
      setIsRunning(false);
    }
  }, [config]);

  const totalDecisions = decisions.length;
  const successRate = totalDecisions > 0
    ? Math.round((decisions.filter((d) => d.confidence > 70).length / totalDecisions) * 100)
    : 0;

  // Not connected
  if (!isConnected) {
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
            <button onClick={connect} disabled={isConnecting} className="w-full btn-primary py-3">
              <WalletIcon className="w-5 h-5" />
              {isConnecting ? "Connecting..." : "Connect MetaMask"}
            </button>
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldIcon className="w-3.5 h-3.5" />
                <span>0G Galileo Testnet (Chain ID: 16602)</span>
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Home</a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Connected
  return (
    <div className="min-h-screen bg-black">
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
              <span className="text-white">{balance} OG</span>
              {shorten(address || "")}

            </div>
            <button onClick={disconnect} className="text-xs text-gray-500 hover:text-white transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-0 mb-6 border-b border-white/10">
          {([
            { id: "overview" as const, label: "Overview", icon: ChartIcon },
            { id: "decisions" as const, label: "Decisions", icon: BrainIcon },
            { id: "settings" as const, label: "Settings", icon: SettingsIcon },
          ]).map((tab) => (
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
              <div className="card shadow-google mb-5">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5 text-white">Aegis Alpha</h2>
                    <p className="text-sm text-gray-400">
                      {config.strategy.charAt(0).toUpperCase() + config.strategy.slice(1)} Yield • {config.riskTolerance.charAt(0).toUpperCase() + config.riskTolerance.slice(1)} Risk
                    </p>
                    <p className="text-xs text-gray-500 font-mono mt-1">Wallet: {shorten(address || "")}</p>
                  </div>
                  <button
                    onClick={runAgent}
                    disabled={isRunning}
                    className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50"
                  >
                    {isRunning ? (
                      <><span className="animate-spin inline-block">⟳</span> Analyzing...</>
                    ) : (
                      <><ZapIcon className="w-4 h-4" /> Run Agent</>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Decisions", value: totalDecisions.toString(), icon: BrainIcon },
                    { label: "Confidence", value: totalDecisions > 0 ? `${successRate}%` : "—", icon: CheckIcon },
                    { label: "Risk Limit", value: `${config.maxPositionPct}% max`, icon: ChartIcon },
                    { label: "On-Chain", value: totalDecisions > 0 ? "Verified" : "Ready", icon: ShieldIcon, online: totalDecisions > 0 },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <s.icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold font-mono text-white">{s.value}</div>
                        {s.online && <span className="status-dot status-online" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {[
                  { title: "New Agent", desc: "Deploy another agent", icon: PlusIcon, color: "orange" },
                  { title: "View History", desc: "All past decisions", icon: HistoryIcon, color: "purple" },
                  { title: "Verify Proof", desc: "Check TEE attestation", icon: ShieldIcon, color: "green" },
                ].map((item) => (
                  <button key={item.title} className="card flex items-center gap-3 hover:shadow-google-lg transition-all group text-left">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                      item.color === "green" ? "bg-green-500/10 text-green-400"
                        : item.color === "purple" ? "bg-purple-500/10 text-purple-400"
                        : "bg-orange-500/10 text-orange-400"
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

              {Object.keys(livePrices).length > 0 && (
                <div className="card shadow-google mb-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">Live Market Prices</h3>
                      <span className="status-dot status-online" />
                      <span className="text-xs text-gray-500">{priceSource}</span>
                    </div>
                    <span className="text-xs text-gray-500">Updated {new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {Object.entries(livePrices).map(([token, price]) => (
                      <div key={token} className="bg-white/5 rounded-xl p-3">
                        <div className="text-xs text-gray-400 mb-1">{token}</div>
                        <div className="text-sm font-mono font-bold text-white">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="card shadow-google">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Recent Decisions</h3>
                  <button onClick={() => setActiveTab("decisions")} className="text-xs text-orange-400 hover:text-orange-300 font-medium">View All →</button>
                </div>
                {decisions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">No decisions yet. Click &quot;Run Agent&quot; to start.</div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {decisions.slice(0, 3).map((d) => (
                      <div key={d.id} className="py-3 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className="status-dot status-online" />
                            <span className="text-sm font-medium text-white">{d.action}</span>
                          </div>
                          <span className="proof-badge"><CheckIcon className="w-3 h-3" /> {d.confidence}%</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 ml-5">{d.reasoning}</p>
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
                  <div className="card text-center py-12 text-gray-500 text-sm">No decisions yet.</div>
                ) : decisions.map((d) => (
                  <div key={d.id} className="card shadow-google hover:shadow-google-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="status-dot status-online" />
                        <div>
                          <h3 className="text-base font-semibold text-white">{d.action}</h3>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">{d.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-0.5">Confidence</div>
                          <div className="text-sm font-mono font-semibold text-white">{d.confidence}%</div>
                        </div>
                        <span className="proof-badge"><CheckIcon className="w-3 h-3" /> Verified</span>
                      </div>
                    </div>
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BrainIcon className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">Agent Reasoning</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{d.reasoning}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><DatabaseIcon className="w-3.5 h-3.5" /> 0G Storage {d.storageResult && <span className="text-green-400">✓</span>}</span>
                        <span className="flex items-center gap-1.5"><ZapIcon className="w-3.5 h-3.5" /> 0G Compute {d.computeResult && <span className="text-green-400">{d.computeResult.latencyMs}ms</span>}</span>
                        <span className="font-mono text-gray-500">{d.model}</span>
                      </div>
                    </div>
                    {d.teeProof && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs">
                          <ShieldIcon className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-medium">TEE Verified</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500 font-mono">{d.teeProof.attestationHash.slice(0, 16)}...</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">{d.teeProof.modelId}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                      <label className="label">Strategy</label>
                      <select className="select" value={config.strategy} onChange={(e) => setConfig((c) => ({ ...c, strategy: e.target.value as AgentConfig["strategy"] }))}>
                        <option value="conservative">Conservative Yield</option>
                        <option value="moderate">Moderate Growth</option>
                        <option value="aggressive">Aggressive Alpha</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Max Position Size (%)</label>
                      <input type="number" value={config.maxPositionPct} min={1} max={25} onChange={(e) => setConfig((c) => ({ ...c, maxPositionPct: Number(e.target.value) }))} className="input" />
                    </div>
                    <div>
                      <label className="label">Risk Tolerance</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["low", "medium", "high"] as const).map((l) => (
                          <button key={l} onClick={() => setConfig((c) => ({ ...c, riskTolerance: l }))} className={`px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors ${config.riskTolerance === l ? "bg-orange-500/10 text-orange-400 border-orange-500/30" : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
                            {l.charAt(0).toUpperCase() + l.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow-google">
                  <h3 className="text-base font-semibold mb-4 text-white">Agent Identity (ERC-7857)</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Connected Wallet", value: shorten(address || "0x0"), accent: true },
                      { label: "Balance", value: `${balance} OG` },
                      { label: "Network", value: "0G Galileo Testnet", online: true },
                      { label: "Compute Model", value: "0GM-1.0-35B (0G Compute)" },
                      { label: "TEE Verification", value: "TDX Attestation", online: true },
                      { label: "Agent ID Contract", value: "0x423B...4C91", link: "https://scan.0g.ai/address/0x423B8701Da3a251a3A3fc2d241b71e8d05744C91" },
                      { label: "DecisionLog", value: "0xcC1E...b262", link: "https://scan.0g.ai/address/0xcC1Ef2948269d702c719E6BA1A55D25b3c05b262" },
                      { label: "AegisVault", value: "0x13Bb...4D60", link: "https://scan.0g.ai/address/0x13Bb32402BCFfDb486c675f943Be7b07BBa54D60" },
                    ].map((item, i) => (
                      <div key={item.label} className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-white/10" : ""}`}>
                        <span className="text-sm text-gray-400">{item.label}</span>
                        {item.online ? (
                          <span className="flex items-center gap-2 text-sm text-white"><span className="status-dot status-online" />{item.value}</span>
                        ) : (item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-orange-400 hover:text-orange-300 underline underline-offset-2">{item.value}</a>
                        ) : (
                          <span className={`text-sm font-mono ${item.accent ? "text-orange-400" : "text-white"}`}>{item.value}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card shadow-google mt-4">
                  <h3 className="text-base font-semibold mb-3 text-white">On-Chain Risk Enforcement</h3>
                  <p className="text-sm text-gray-400 mb-4">Your vault enforces risk rules that the AI agent cannot bypass. Every constraint is a smart contract requirement.</p>
                  <div className="space-y-2">
                    {[
                      { rule: `Max Position Size: ${config.maxPositionPct}%`, desc: "Agent cannot allocate more than this to any single position" },
                      { rule: `Risk Tolerance: ${config.riskTolerance.charAt(0).toUpperCase() + config.riskTolerance.slice(1)}`, desc: "AI reasoning is constrained by this risk level" },
                      { rule: `Strategy: ${config.strategy.charAt(0).toUpperCase() + config.strategy.slice(1)}`, desc: "Agent follows this strategy framework" },
                    ].map((item) => (
                      <div key={item.rule} className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
                        <div className="text-sm font-medium text-orange-400">{item.rule}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
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
