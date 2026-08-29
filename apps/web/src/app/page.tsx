"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ShieldIcon,
  BrainIcon,
  DatabaseIcon,
  LinkIcon,
  LockIcon,
  CheckIcon,
  ZapIcon,
  ArrowIcon,
  CodeIcon,
  GlobeIcon,
  WarningIcon,
  BanIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  TokenIcon,
  LockEnforcedIcon,
} from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.85, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-7 w-7 rounded-lg" />
            <span className="text-base font-semibold text-white">
              Aegis
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#built-on-0g" className="text-sm text-gray-400 hover:text-white transition-colors">
              Built on 0G
            </a>
          </div>
          <a href="/dashboard" className="btn-primary text-sm">
            Launch App
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-black">
        {/* Video Background */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          style={{ opacity: videoOpacity }}
          poster="/logos/aegis-logo.png"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </motion.video>
        <div className="video-overlay" />



        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-3xl mx-auto text-center px-6"
          style={{ y: textY }}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-white">
              <span className="status-dot status-online" />
              Live on 0G Testnet
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6), 0 4px 80px rgba(0,0,0,0.3)" }}
          >
            Your AI.
            <br />
            Your Rules.
            <br />
            <span className="text-white">Verified On-Chain.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.5)" }}
          >
            The first AI DeFi agent where risk rules are enforced onchain —
            the agent literally cannot break them. Every decision has a TEE receipt.
            Every action settled on 0G. No black boxes.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
          >
            <a href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 text-base font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg">
              Launch Agent
              <ArrowIcon className="w-4 h-4" />
            </a>
            <a href="#how-it-works" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-white/90 transition-all shadow-lg">
              Learn More
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {[
              { label: "TEE Verified", icon: ShieldIcon },
              { label: "0G Storage", icon: DatabaseIcon },
              { label: "On-Chain", icon: LinkIcon },
              { label: "Open Source", icon: CodeIcon },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 shadow-sm"
              >
                <item.icon className="w-3.5 h-3.5 text-orange-400" />
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium text-red-400 uppercase tracking-wider mb-3 block"
            >
              The Problem
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
            >
              AI Agents Are Managing Real Money.
              <br />
              <span className="text-red-400">But They Can Do Anything.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              AI agents are executing trades in DeFi right now. But they operate as black boxes with zero enforceable constraints. The result? Billions lost to unauthorized trades, ignored risk limits, and scam tokens.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                Icon: WarningIcon,
                title: "No Risk Limits",
                desc: "Traditional AI agents can trade your entire portfolio on a single bad decision. No max position size. No stop loss. No safety net.",
              },
              {
                Icon: BanIcon,
                title: "No Token Restrictions",
                desc: "An AI agent can trade ANY token — including scam coins, rug pulls, and honeypots. You have zero control over what it touches.",
              },
              {
                Icon: EyeOffIcon,
                title: "No Proof of Execution",
                desc: "When an AI agent makes a trade, you have no cryptographic proof of what it actually did. No receipt. No audit trail. No accountability.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 mb-4">
                  <item.Icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 text-center"
          >
            <motion.p variants={fadeUp} className="text-lg text-gray-300 mb-4">
              The problem isn't AI. <span className="text-white font-semibold">The problem is trust.</span>
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-gray-400 max-w-xl mx-auto">
              You wouldn't hand your car keys to a stranger and say "drive safely." So why hand your portfolio to an AI with no enforceable rules?
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium text-green-400 uppercase tracking-wider mb-3 block"
            >
              The Solution
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
            >
              Risk Rules Enforced Onchain.
              <br />
              <span className="text-green-400">The Agent Cannot Bypass Them.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Aegis deploys your risk constraints as smart contracts. The AI operates within them. Not suggestions. Not guidelines. Enforceable onchain rules the agent physically cannot break.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                Icon: ShieldCheckIcon,
                title: "Max Position Size",
                desc: "Set a maximum percentage the agent can allocate to any single position. The smart contract enforces it — the agent literally cannot exceed it.",
              },
              {
                Icon: TokenIcon,
                title: "Allowed Tokens Only",
                desc: "Whitelist specific tokens the agent can trade. Anything else is blocked by the smart contract. No scam coins. No rug pulls.",
              },
              {
                Icon: LockEnforcedIcon,
                title: "Risk Tolerance Levels",
                desc: "Set conservative, moderate, or aggressive. The AI reasoning is constrained by your risk profile — not the other way around.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500/10 mb-4">
                  <item.Icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium text-orange-400 uppercase tracking-wider mb-3 block"
            >
              Process
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 max-w-lg mx-auto text-base"
            >
              Three steps to autonomous, verifiable DeFi management.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                step: "01",
                title: "Connect & Configure",
                description:
                  "Link your wallet and set your rules. Max position size, risk tolerance, allowed tokens. You stay in control.",
                icon: LockIcon,
                color: "orange",
              },
              {
                step: "02",
                title: "Agent Analyzes & Decides",
                description:
                  "Aegis runs verifiable inference on 0G Compute. Every reasoning step stored on 0G Storage. No black boxes.",
                icon: BrainIcon,
                color: "purple",
              },
              {
                step: "03",
                title: "Execute & Verify",
                description:
                  "Proposed actions settle on 0G Chain. Every decision logged immutably. TEE attestation proves it was real.",
                icon: CheckIcon,
                color: "green",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={scaleIn}
                className="bg-neutral-900 border border-neutral-800 p-6 group hover:border-neutral-700 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-bold font-mono text-gray-600 group-hover:text-orange-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="flex-1 h-px bg-gray-800 group-hover:bg-orange-900 transition-colors" />
                </div>

                <div className={`w-11 h-11 flex items-center justify-center rounded-xl mb-5 transition-colors ${
                  item.color === "green"
                    ? "bg-green-500/10 text-green-400"
                    : item.color === "purple"
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-orange-500/10 text-orange-400"
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium text-orange-400 uppercase tracking-wider mb-3 block"
            >
              Capabilities
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
            >
              Built on 0G
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 max-w-lg mx-auto text-base"
            >
              Every layer of the 0G stack, working together for verifiable AI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                title: "Verifiable Inference",
                description:
                  "Every AI decision runs on 0G Compute inside a Trusted Execution Environment. Cryptographic proof that the model ran, with your data, and produced this exact output.",
                icon: BrainIcon,
                tag: "0G Compute",
                color: "orange",
              },
              {
                title: "Persistent Memory",
                description:
                  "Agent reasoning, strategy evolution, and trade history stored permanently on 0G Storage. Your agent learns and improves — with a complete audit trail.",
                icon: DatabaseIcon,
                tag: "0G Storage",
                color: "purple",
              },
              {
                title: "On-Chain Settlement",
                description:
                  "Every proposed action settles on 0G Chain. Smart contracts enforce your rules. No silent failures. No hidden trades.",
                icon: LinkIcon,
                tag: "0G Chain",
                color: "orange",
              },
              {
                title: "Portable Identity",
                description:
                  "Your agent gets an ERC-7857 Agentic ID. Tradeable, transferable, with its full track record embedded. Your agent's reputation is on-chain.",
                icon: ShieldIcon,
                tag: "ERC-7857",
                color: "green",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="bg-neutral-900 border border-neutral-800 p-6 hover:border-neutral-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${
                    item.color === "green"
                      ? "bg-green-500/10 text-green-400"
                      : item.color === "purple"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-orange-500/10 text-orange-400"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Decisions Made", value: "1,247", suffix: "", icon: BrainIcon },
              { label: "Verifications", value: "1,247", suffix: "", icon: ShieldIcon },
              { label: "Uptime", value: "99.9", suffix: "%", icon: ZapIcon },
              { label: "Avg Response", value: "16", suffix: "s", icon: ZapIcon },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-neutral-900 border border-neutral-800 p-6 text-center"
              >
                <stat.icon className="w-4 h-4 text-gray-600 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold font-mono mb-1 text-white">
                  {stat.value}
                  <span className="text-orange-400">{stat.suffix}</span>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
          >
            Start Building Your Agent
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-400 mb-10 max-w-md mx-auto text-base"
          >
            Connect your wallet, configure your strategy, and let Aegis manage
            your DeFi portfolio with verifiable AI.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a href="/dashboard" className="inline-flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-base font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-500/25">
              Launch App
              <ArrowIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-800 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6 rounded-md" />
            <span className="text-sm font-medium text-white">Aegis</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <GlobeIcon className="w-3.5 h-3.5" />
            Built on 0G Network
          </div>
        </div>
      </footer>
    </div>
  );
}
