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
  ArrowLeftIcon,
} from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
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
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6 rounded-md" />
            <span className="text-sm font-semibold text-gray-900">Aegis</span>
            <span className="text-xs text-gray-300 font-mono">/</span>
            <span className="text-xs text-gray-400 font-mono">Verify</span>
          </a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
            <ArrowLeftIcon className="w-3 h-3" /> Home
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-10">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ShieldIcon className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">Verify Agent Decisions</h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Enter a decision ID or transaction hash to verify the TEE attestation and on-chain proof.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Decision ID or TX hash..."
              className="flex-1 input font-mono text-sm"
            />
            <button onClick={handleSearch} className="btn-primary px-6">
              <SearchIcon className="w-4 h-4" /> Verify
            </button>
          </div>
        </motion.div>

        {showResult && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            {/* Success Banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-green-800">Decision Verified</div>
                <div className="text-xs text-green-600 mt-0.5">All checks passed. TEE attestation confirmed.</div>
              </div>
            </div>

            {/* Decision Card */}
            <div className="card shadow-google mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-gray-900">{mockVerification.decision.action}</h2>
                  <p className="text-xs text-gray-400 font-mono">{mockVerification.id}</p>
                </div>
                <span className="proof-badge"><CheckIcon className="w-3 h-3" /> Verified</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Confidence</div>
                  <div className="text-lg font-bold font-mono text-gray-900">{mockVerification.decision.confidence}%</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Risk Score</div>
                  <div className="text-lg font-bold font-mono text-gray-900">{mockVerification.decision.riskScore}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Timestamp</div>
                  <div className="text-sm font-mono text-gray-900">{new Date(mockVerification.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BrainIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Agent Reasoning</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{mockVerification.decision.reasoning}</p>
              </div>
            </div>

            {/* TEE Verification */}
            <div className="card shadow-google mb-4">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <ShieldIcon className="w-4 h-4 text-green-600" /> TEE Verification
              </h3>
              <div className="space-y-0">
                {[
                  { label: "TEE Type", value: mockVerification.verification.teeType, ok: true },
                  { label: "Signer Match", value: "Passed", ok: true },
                  { label: "Compose Hash", value: "Verified", ok: true },
                  { label: "Provider", value: mockVerification.verification.provider, ok: true },
                  { label: "Model", value: mockVerification.verification.model, ok: true },
                ].map((item, i, arr) => (
                  <div key={item.label} className={`flex items-center justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-900">{item.value}</span>
                      {item.ok ? <CheckIcon className="w-3.5 h-3.5 text-green-600" /> : <XCircleIcon className="w-3.5 h-3.5 text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage + Chain */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card shadow-google">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900">
                  <DatabaseIcon className="w-4 h-4 text-blue-600" /> 0G Storage
                </h3>
                <div className="flex items-center justify-between py-2 mb-3">
                  <span className="text-xs text-gray-400">Root Hash</span>
                  <span className="text-xs font-mono text-blue-600">{mockVerification.storage.hash}</span>
                </div>
                <a href="#" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                  View on Explorer <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>
              <div className="card shadow-google">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900">
                  <LinkIcon className="w-4 h-4 text-blue-600" /> 0G Chain
                </h3>
                <div className="flex items-center justify-between py-2 mb-3">
                  <span className="text-xs text-gray-400">TX Hash</span>
                  <span className="text-xs font-mono text-blue-600">{mockVerification.chain.txHash}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-gray-400">Block</span>
                  <span className="text-xs font-mono text-gray-900">#{mockVerification.chain.blockNumber.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
