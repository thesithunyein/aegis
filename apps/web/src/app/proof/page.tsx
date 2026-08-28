"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldIcon,
  CheckIcon,
  XCircleIcon,
  SearchIcon,
  ExternalLinkIcon,
  BrainIcon,
  DatabaseIcon,
  LinkIcon,
  ClockIcon,
  ArrowLeftIcon,
} from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const mockVerification = {
  id: "decision-1724851381-abc123",
  timestamp: "2026-08-28T14:23:01Z",
  agent: { name: "Aegis Alpha", address: "0x9f66...2192", tokenId: "#0047" },
  decision: {
    action: "Rebalance ETH/USDC position",
    reasoning: "ETH showing strong momentum on 4H timeframe. RSI at 62, not overbought. Increasing ETH allocation from 15% to 18% per risk parameters.",
    confidence: 87,
    riskScore: 35,
  },
  verification: {
    teeVerified: true,
    teeType: "TeeML",
    provider: "0xd996...471C",
    model: "deepseek-v3.1",
    signerMatch: true,
    composeHashMatch: true,
  },
  storage: { hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d..." },
  chain: { txHash: "0x1a2b3c4d5e6f7a8b9c0d...", blockNumber: 12345678 },
};

export default function ProofPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#030712]">
      <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-2xl border-b border-[#1a2540]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6" />
            <span className="text-sm font-semibold text-[#f0f6ff]">Aegis</span>
            <span className="text-xs text-[#4a5d80] font-mono">/ Verify</span>
          </a>
          <a href="/" className="text-xs text-[#4a5d80] hover:text-[#f0f6ff] transition-colors flex items-center gap-1">
            <ArrowLeftIcon className="w-3 h-3" /> Home
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <img src="/logos/aegis-logo.png" alt="Aegis" className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold tracking-tight mb-3 text-[#f0f6ff]">Verify Agent Decisions</h1>
          <p className="text-[#8899b4] max-w-md mx-auto">
            Enter a decision ID or transaction hash to verify the TEE attestation and on-chain proof.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
          <div className="flex gap-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Decision ID or TX hash..."
              className="flex-1 px-4 py-3 bg-[#0d1321] border border-[#1a2540] border-r-0 text-sm text-[#f0f6ff] placeholder:text-[#4a5d80] focus:outline-none focus:border-[#06b6d4] transition-colors font-mono"
            />
            <button onClick={handleSearch} className="px-6 py-3 bg-[#f0f6ff] text-[#030712] text-sm font-semibold hover:bg-[#f0f6ff]/90 transition-all flex items-center gap-2">
              <SearchIcon className="w-4 h-4" /> Verify
            </button>
          </div>
        </motion.div>

        {showResult && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="bg-[#10b981]/10 border border-[#10b981]/20 p-4 mb-6 flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-[#10b981] flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-[#10b981]">Decision Verified</div>
                <div className="text-xs text-[#8899b4] mt-0.5">All checks passed. TEE attestation confirmed.</div>
              </div>
            </div>

            <div className="bg-[#0d1321] border border-[#1a2540] p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-[#f0f6ff]">{mockVerification.decision.action}</h2>
                  <p className="text-xs text-[#4a5d80] font-mono">{mockVerification.id}</p>
                </div>
                <span className="proof-badge"><CheckIcon className="w-3 h-3" /> Verified</span>
              </div>

              <div className="grid grid-cols-3 gap-0 border border-[#1a2540] mb-4">
                <div className="p-3 text-center border-r border-[#1a2540]">
                  <div className="text-xs text-[#4a5d80] mb-1">Confidence</div>
                  <div className="text-lg font-bold font-mono text-[#f0f6ff]">{mockVerification.decision.confidence}%</div>
                </div>
                <div className="p-3 text-center border-r border-[#1a2540]">
                  <div className="text-xs text-[#4a5d80] mb-1">Risk Score</div>
                  <div className="text-lg font-bold font-mono text-[#f0f6ff]">{mockVerification.decision.riskScore}</div>
                </div>
                <div className="p-3 text-center">
                  <div className="text-xs text-[#4a5d80] mb-1">Timestamp</div>
                  <div className="text-sm font-mono text-[#f0f6ff]">{new Date(mockVerification.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="bg-[#030712] border border-[#1a2540] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BrainIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span className="text-xs font-medium text-[#06b6d4] uppercase tracking-wider">Agent Reasoning</span>
                </div>
                <p className="text-sm text-[#8899b4] leading-relaxed">{mockVerification.decision.reasoning}</p>
              </div>
            </div>

            <div className="bg-[#0d1321] border border-[#1a2540] p-6 mb-4">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[#f0f6ff]">
                <ShieldIcon className="w-4 h-4 text-[#10b981]" /> TEE Verification
              </h3>
              <div className="space-y-3">
                {[
                  { label: "TEE Type", value: mockVerification.verification.teeType, ok: true },
                  { label: "Signer Match", value: "Passed", ok: true },
                  { label: "Compose Hash", value: "Verified", ok: true },
                  { label: "Provider", value: mockVerification.verification.provider, ok: true },
                  { label: "Model", value: mockVerification.verification.model, ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#1a2540] last:border-0">
                    <span className="text-sm text-[#8899b4]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-[#f0f6ff]">{item.value}</span>
                      {item.ok ? <CheckIcon className="w-3.5 h-3.5 text-[#10b981]" /> : <XCircleIcon className="w-3.5 h-3.5 text-[#ef4444]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0d1321] border border-[#1a2540] p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[#f0f6ff]">
                  <DatabaseIcon className="w-4 h-4 text-[#06b6d4]" /> 0G Storage
                </h3>
                <div className="flex items-center justify-between py-2 mb-3">
                  <span className="text-xs text-[#4a5d80]">Root Hash</span>
                  <span className="text-xs font-mono text-[#06b6d4]">{mockVerification.storage.hash}</span>
                </div>
                <a href="#" className="flex items-center gap-1 text-xs text-[#8899b4] hover:text-[#f0f6ff] transition-colors">
                  View on Explorer <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>
              <div className="bg-[#0d1321] border border-[#1a2540] p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[#f0f6ff]">
                  <LinkIcon className="w-4 h-4 text-[#06b6d4]" /> 0G Chain
                </h3>
                <div className="flex items-center justify-between py-2 mb-3">
                  <span className="text-xs text-[#4a5d80]">TX Hash</span>
                  <span className="text-xs font-mono text-[#06b6d4]">{mockVerification.chain.txHash}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-[#4a5d80]">Block</span>
                  <span className="text-xs font-mono text-[#f0f6ff]">#{mockVerification.chain.blockNumber.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
