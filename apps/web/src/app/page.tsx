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
  TrendingUp,
  Code2,
  Globe,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
    <div className="min-h-screen bg-aegis-black selection:bg-aegis-blue/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-aegis-black/80 backdrop-blur-xl border-b border-aegis-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight">Aegis</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
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
            <a
              href="#built-on-0g"
              className="text-sm text-aegis-muted hover:text-aegis-white transition-colors"
            >
              Built on 0G
            </a>
          </div>
          <a
            href="/dashboard"
            className="px-5 py-2.5 bg-aegis-white text-aegis-black text-sm font-semibold hover:bg-aegis-white/90 transition-all"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-aegis-blue/5 blur-[150px] rounded-full" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-aegis-green/5 blur-[120px] rounded-full" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aegis-card border border-aegis-border text-xs font-medium text-aegis-muted uppercase tracking-wider">
              <span className="status-dot status-online" />
              Live on 0G Testnet
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            Your AI.
            <br />
            <span className="gradient-text">Your Rules.</span>
            <br />
            Verified On-Chain.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-aegis-muted max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Aegis is an autonomous AI agent that manages your DeFi portfolio and
            proves every decision on-chain. No black boxes. No blind trust.
            Every inference verified. Every action settled on 0G.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-4 bg-aegis-white text-aegis-black text-base font-semibold hover:bg-aegis-white/90 transition-all"
            >
              Launch Agent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 border border-aegis-border text-aegis-white text-base font-medium hover:border-aegis-border-hover transition-all"
            >
              Learn More
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs text-aegis-dim uppercase tracking-wider"
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
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Open Source
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
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-mono text-aegis-blue uppercase tracking-widest mb-4 block"
            >
              Process
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-aegis-muted max-w-xl mx-auto text-lg"
            >
              Three steps to autonomous, verifiable DeFi management.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                accent: "blue",
              },
              {
                step: "02",
                title: "Agent Analyzes & Decides",
                description:
                  "Aegis runs verifiable inference on 0G Compute. Every reasoning step stored on 0G Storage. No black boxes.",
                icon: Brain,
                accent: "blue",
              },
              {
                step: "03",
                title: "Execute & Verify",
                description:
                  "Proposed actions settle on 0G Chain. Every decision logged immutably. TEE attestation proves it was real.",
                icon: CheckCircle2,
                accent: "green",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative p-8 border border-aegis-border bg-aegis-card card-hover group"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl font-bold font-mono text-aegis-border group-hover:text-aegis-blue transition-colors">
                    {item.step}
                  </span>
                  <div className="flex-1 h-px bg-aegis-border group-hover:bg-aegis-blue/30 transition-colors" />
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center border mb-6 transition-colors ${
                  item.accent === "green"
                    ? "bg-aegis-green/10 border-aegis-green/20"
                    : "bg-aegis-blue/10 border-aegis-blue/20"
                }`}>
                  <item.icon className={`w-6 h-6 ${
                    item.accent === "green" ? "text-aegis-green" : "text-aegis-blue"
                  }`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-aegis-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-aegis-border bg-aegis-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-mono text-aegis-blue uppercase tracking-widest mb-4 block"
            >
              Capabilities
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Built on 0G
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-aegis-muted max-w-xl mx-auto text-lg"
            >
              Every layer of the 0G stack, working together for verifiable AI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                  <div className="w-12 h-12 flex items-center justify-center bg-aegis-surface border border-aegis-border">
                    <item.icon className="w-6 h-6 text-aegis-white" />
                  </div>
                  <span
                    className={`text-xs font-mono px-3 py-1.5 ${
                      item.color === "green"
                        ? "text-aegis-green bg-aegis-green/10 border border-aegis-green/20"
                        : "text-aegis-blue bg-aegis-blue/10 border border-aegis-blue/20"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-aegis-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-aegis-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-aegis-border"
          >
            {[
              { label: "Decisions Made", value: "0", suffix: "", icon: Brain },
              { label: "Verifications", value: "0", suffix: "", icon: Shield },
              { label: "Uptime", value: "99.9", suffix: "%", icon: TrendingUp },
              { label: "Avg Response", value: "1.2", suffix: "s", icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`p-8 text-center ${
                  i > 0 ? "border-l border-aegis-border" : ""
                }`}
              >
                <stat.icon className="w-5 h-5 text-aegis-dim mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold font-mono mb-2">
                  {stat.value}
                  <span className="text-aegis-blue">{stat.suffix}</span>
                </div>
                <div className="text-xs text-aegis-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-aegis-border relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aegis-blue/5 blur-[150px] rounded-full" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Start Building Your Agent
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-aegis-muted mb-12 max-w-xl mx-auto text-lg"
          >
            Connect your wallet, configure your strategy, and let Aegis manage
            your DeFi portfolio with verifiable AI.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-aegis-white text-aegis-black text-base font-semibold hover:bg-aegis-white/90 transition-all"
            >
              Launch App
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-aegis-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6" />
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
          <div className="flex items-center gap-2 text-xs text-aegis-dim">
            <Globe className="w-3.5 h-3.5" />
            Built on 0G Network
          </div>
        </div>
      </footer>
    </div>
  );
}
