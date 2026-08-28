"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Brain,
  Database,
  Link2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Lock,
  Eye,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-aegis-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-aegis-black/80 backdrop-blur-sm border-b border-aegis-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logos/aegis-logo-transparent.png"
              alt="Aegis"
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold tracking-tight">Aegis</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm text-aegis-muted hover:text-aegis-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-sm text-aegis-muted hover:text-aegis-white transition-colors"
            >
              Features
            </a>
            <button className="px-5 py-2.5 bg-aegis-white text-aegis-black text-sm font-semibold hover:bg-aegis-white/90 transition-all">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Gradient overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aegis-blue/5 blur-[120px] rounded-full" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aegis-card border border-aegis-border text-xs font-medium text-aegis-muted uppercase tracking-wider">
              <span className="status-dot status-online" />
              Live on 0G Testnet
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Your AI.{" "}
            <span className="gradient-text">Your Rules.</span>
            <br />
            Verified On-Chain.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-aegis-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Aegis is an autonomous AI agent that manages your DeFi portfolio and
            proves every decision on-chain. No black boxes. No blind trust.
            Every inference verified. Every action settled on 0G.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group flex items-center gap-2 px-8 py-4 bg-aegis-white text-aegis-black text-base font-semibold hover:bg-aegis-white/90 transition-all">
              Launch Agent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 border border-aegis-border text-aegis-white text-base font-medium hover:border-aegis-border-hover transition-all">
              View Documentation
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center justify-center gap-8 text-xs text-aegis-dim uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              TEE Verified
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              0G Storage
            </span>
            <span className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              On-Chain Settlement
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-aegis-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-aegis-muted max-w-xl mx-auto"
            >
              Three steps to autonomous, verifiable DeFi management.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-0"
          >
            {[
              {
                step: "01",
                title: "Connect & Configure",
                description:
                  "Link your wallet and set your rules. Max position size, risk tolerance, allowed tokens. You stay in control.",
                icon: Lock,
              },
              {
                step: "02",
                title: "Agent Analyzes & Decides",
                description:
                  "Aegis runs verifiable inference on 0G Compute. Every reasoning step stored on 0G Storage. No black boxes.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Execute & Verify",
                description:
                  "Proposed actions settle on 0G Chain. Every decision logged immutably. TEE attestation proves it was real.",
                icon: CheckCircle2,
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="p-8 border border-aegis-border bg-aegis-card card-hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono text-aegis-blue">
                    {item.step}
                  </span>
                  <div className="flex-1 h-px bg-aegis-border" />
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-aegis-surface border border-aegis-border mb-4">
                  <item.icon className="w-5 h-5 text-aegis-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-aegis-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-aegis-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              Built on 0G
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-aegis-muted max-w-xl mx-auto"
            >
              Every layer of the 0G stack, working together for verifiable AI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-0"
          >
            {[
              {
                title: "Verifiable Inference",
                description:
                  "Every AI decision runs on 0G Compute inside a Trusted Execution Environment. Cryptographic proof that the model ran, with your data, and produced this exact output.",
                icon: Brain,
                tag: "0G Compute",
                color: "blue",
              },
              {
                title: "Persistent Memory",
                description:
                  "Agent reasoning, strategy evolution, and trade history stored permanently on 0G Storage. Your agent learns and improves — with a complete audit trail.",
                icon: Database,
                tag: "0G Storage",
                color: "blue",
              },
              {
                title: "On-Chain Settlement",
                description:
                  "Every proposed action settles on 0G Chain. Smart contracts enforce your rules. No silent failures. No hidden trades.",
                icon: Link2,
                tag: "0G Chain",
                color: "blue",
              },
              {
                title: "Portable Identity",
                description:
                  "Your agent gets an ERC-7857 Agentic ID. Tradeable, transferable, with its full track record embedded. Your agent's reputation is on-chain.",
                icon: Shield,
                tag: "ERC-7857",
                color: "green",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="p-8 border border-aegis-border bg-aegis-card card-hover"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-aegis-surface border border-aegis-border">
                    <item.icon className="w-5 h-5 text-aegis-white" />
                  </div>
                  <span
                    className={`text-xs font-mono px-3 py-1 ${
                      item.color === "green"
                        ? "text-aegis-green bg-aegis-green/10 border border-aegis-green/20"
                        : "text-aegis-blue bg-aegis-blue/10 border border-aegis-blue/20"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-aegis-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-aegis-border bg-aegis-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Decisions Made", value: "0", suffix: "" },
              { label: "Verifications", value: "0", suffix: "" },
              { label: "Uptime", value: "99.9", suffix: "%" },
              { label: "Avg Response", value: "1.2", suffix: "s" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-mono mb-2">
                  {stat.value}
                  <span className="text-aegis-blue">{stat.suffix}</span>
                </div>
                <div className="text-sm text-aegis-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-aegis-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            Start Building Your Agent
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-aegis-muted mb-10 max-w-xl mx-auto"
          >
            Connect your wallet, configure your strategy, and let Aegis manage
            your DeFi portfolio with verifiable AI.
          </motion.p>
          <motion.div variants={fadeUp}>
            <button className="group flex items-center gap-2 mx-auto px-10 py-4 bg-aegis-white text-aegis-black text-base font-semibold hover:bg-aegis-white/90 transition-all">
              Launch App
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-aegis-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logos/aegis-logo-transparent.png"
              alt="Aegis"
              className="h-6 w-6"
            />
            <span className="text-sm font-medium">Aegis</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-aegis-muted">
            <a href="#" className="hover:text-aegis-white transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-aegis-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-aegis-white transition-colors">
              Twitter
            </a>
          </div>
          <div className="text-xs text-aegis-dim">
            Built on 0G Network
          </div>
        </div>
      </footer>
    </div>
  );
}
