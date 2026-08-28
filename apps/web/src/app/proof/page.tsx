"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  XCircle,
  Search,
  ExternalLink,
  Brain,
  Database,
  Link2,
  Clock,
  Zap,
  ArrowLeft,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Mock verification data
const mockVerification = {
  id: "decision-1724851381-abc123",
  timestamp: "2026-08-28T14:23:01Z",
  agent: {
    name: "Aegis Alpha",
    address: "0x9f66158c560ce5c8b40820fdcd2874ff8d852192",
    tokenId: "#0047",
  },
  decision: {
    action: "Rebalance ETH/USDC position",
    reasoning:
      "ETH showing strong momentum on 4H timeframe. RSI at 62, not overbought. Increasing ETH allocation from 15% to 18% per risk parameters.",
    confidence: 87,
    riskScore: 35,
  },
  verification: {
    teeVerified: true,
    teeType: "TeeML",
    provider: "0xd9966e13a6026Fcca4b13E7ff95c94DE268C471C",
    model: "deepseek-v3.1",
    signerMatch: true,
    composeHashMatch: true,
  },
  storage: {
    hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    url: "https://storage.0g.ai/0x7a8b9c...",
  },
  chain: {
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    blockNumber: 12345678,
    network: "0G Galileo Testnet",
  },
};

export default function ProofPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-aegis-black">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-aegis-black/80 backdrop-blur-sm border-b border-aegis-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center bg-aegis-white">
              <span className="text-aegis-black font-bold text-[10px]">A.</span>
            </div>
            <span className="text-sm font-semibold">Aegis</span>
            <span className="text-xs text-aegis-dim font-mono">/ Verify</span>
          </a>
          <a
            href="/"
            className="text-xs text-aegis-muted hover:text-aegis-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Home
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-12"
        >            <img src="/logos/aegis-logo.png" alt="Aegis" className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Verify Agent Decisions
          </h1>
          <p className="text-aegis-muted max-w-md mx-auto">
            Enter a decision ID or transaction hash to verify the TEE
            attestation and on-chain proof.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <div className="flex gap-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Decision ID or TX hash..."
              className="flex-1 px-4 py-3 bg-aegis-card border border-aegis-border border-r-0 text-sm text-aegis-white placeholder:text-aegis-dim focus:outline-none focus:border-aegis-blue transition-colors font-mono"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-aegis-white text-aegis-black text-sm font-semibold hover:bg-aegis-white/90 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Verify
            </button>
          </div>
        </motion.div>

        {/* Verification Result */}
        {showResult && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {/* Status Banner */}
            <div className="bg-aegis-green/10 border border-aegis-green/20 p-4 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-aegis-green flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-aegis-green">
                  Decision Verified
                </div>
                <div className="text-xs text-aegis-muted mt-0.5">
                  All checks passed. TEE attestation confirmed.
                </div>
              </div>
            </div>

            {/* Decision Details */}
            <div className="bg-aegis-card border border-aegis-border p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    {mockVerification.decision.action}
                  </h2>
                  <p className="text-xs text-aegis-dim font-mono">
                    {mockVerification.id}
                  </p>
                </div>
                <span className="proof-badge">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-3 gap-0 border border-aegis-border mb-4">
                <div className="p-3 text-center border-r border-aegis-border">
                  <div className="text-xs text-aegis-dim mb-1">Confidence</div>
                  <div className="text-lg font-bold font-mono">
                    {mockVerification.decision.confidence}%
                  </div>
                </div>
                <div className="p-3 text-center border-r border-aegis-border">
                  <div className="text-xs text-aegis-dim mb-1">Risk Score</div>
                  <div className="text-lg font-bold font-mono">
                    {mockVerification.decision.riskScore}
                  </div>
                </div>
                <div className="p-3 text-center">
                  <div className="text-xs text-aegis-dim mb-1">Timestamp</div>
                  <div className="text-sm font-mono">
                    {new Date(mockVerification.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="bg-aegis-surface border border-aegis-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-3.5 h-3.5 text-aegis-blue" />
                  <span className="text-xs font-medium text-aegis-blue uppercase tracking-wider">
                    Agent Reasoning
                  </span>
                </div>
                <p className="text-sm text-aegis-muted leading-relaxed">
                  {mockVerification.decision.reasoning}
                </p>
              </div>
            </div>

            {/* Verification Details */}
            <div className="bg-aegis-card border border-aegis-border p-6 mb-4">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-aegis-green" />
                TEE Verification
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "TEE Type",
                    value: mockVerification.verification.teeType,
                    verified: true,
                  },
                  {
                    label: "Signer Match",
                    value: mockVerification.verification.signerMatch
                      ? "Passed"
                      : "Failed",
                    verified: mockVerification.verification.signerMatch,
                  },
                  {
                    label: "Compose Hash",
                    value: mockVerification.verification.composeHashMatch
                      ? "Verified"
                      : "Mismatch",
                    verified: mockVerification.verification.composeHashMatch,
                  },
                  {
                    label: "Provider",
                    value: mockVerification.verification.provider,
                    verified: true,
                  },
                  {
                    label: "Model",
                    value: mockVerification.verification.model,
                    verified: true,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-aegis-border last:border-0"
                  >
                    <span className="text-sm text-aegis-muted">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{item.value}</span>
                      {item.verified ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-aegis-green" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-aegis-red" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage & Chain */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-aegis-card border border-aegis-border p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-aegis-blue" />
                  0G Storage
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-aegis-dim">Root Hash</span>
                    <span className="text-xs font-mono text-aegis-blue truncate max-w-[200px]">
                      {mockVerification.storage.hash.slice(0, 20)}...
                    </span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-xs text-aegis-muted hover:text-aegis-white transition-colors"
                  >
                    View on Explorer
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="bg-aegis-card border border-aegis-border p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-aegis-blue" />
                  0G Chain
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-aegis-dim">TX Hash</span>
                    <span className="text-xs font-mono text-aegis-blue truncate max-w-[200px]">
                      {mockVerification.chain.txHash.slice(0, 20)}...
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-aegis-dim">Block</span>
                    <span className="text-xs font-mono">
                      #{mockVerification.chain.blockNumber.toLocaleString()}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-xs text-aegis-muted hover:text-aegis-white transition-colors"
                  >
                    View on Explorer
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
