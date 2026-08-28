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
} from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/60 backdrop-blur-2xl border-b border-[#1a2540]/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-7 w-7" />
            <span className="text-base font-semibold tracking-tight text-[#f0f6ff]">
              Aegis
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-[#8899b4] hover:text-[#f0f6ff] transition-colors duration-200">
              How It Works
            </a>
            <a href="#features" className="text-sm text-[#8899b4] hover:text-[#f0f6ff] transition-colors duration-200">
              Features
            </a>
            <a href="#built-on-0g" className="text-sm text-[#8899b4] hover:text-[#f0f6ff] transition-colors duration-200">
              Built on 0G
            </a>
          </div>
          <a
            href="/dashboard"
            className="px-5 py-2.5 bg-[#f0f6ff] text-[#030712] text-sm font-semibold hover:bg-[#f0f6ff]/90 transition-all duration-200"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          style={{ scale: videoScale, opacity: videoOpacity }}
          poster="/logos/aegis-logo.png"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </motion.video>

        {/* Gradient Overlay */}
        <div className="video-overlay" />

        {/* Ambient Glow */}
        <div className="ambient-glow w-[600px] h-[600px] bg-[#06b6d4] top-1/4 left-1/4" />
        <div className="ambient-glow w-[400px] h-[400px] bg-[#3b82f6] top-1/3 right-1/4" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
          style={{ y: textY }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0d1321]/80 backdrop-blur-sm border border-[#1a2540] text-xs font-medium text-[#8899b4] uppercase tracking-widest">
              <span className="status-dot status-online" />
              Live on 0G Testnet
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-[96px] font-extrabold tracking-tight leading-[1.05] mb-8 text-white"
            style={{ textShadow: "0 0 60px rgba(255,255,255,0.3), 0 4px 40px rgba(0,0,0,0.9)" }}
          >
            Your AI.
            <br />
            Your Rules.
            <br />
            <span className="gradient-text">Verified On-Chain.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[#e2e8f0] max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}
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
              className="group flex items-center gap-2 px-8 py-4 bg-[#f0f6ff] text-[#030712] text-base font-semibold hover:bg-[#f0f6ff]/90 transition-all duration-200"
            >
              Launch Agent
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 border border-[#1a2540] text-[#f0f6ff] text-base font-medium hover:border-[#243352] hover:bg-[#0d1321]/50 transition-all duration-200"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs text-[#4a5d80] uppercase tracking-widest"
          >
            <span className="flex items-center gap-2">
              <ShieldIcon className="w-4 h-4" />
              TEE Verified
            </span>
            <span className="flex items-center gap-2">
              <DatabaseIcon className="w-4 h-4" />
              0G Storage
            </span>
            <span className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              On-Chain
            </span>
            <span className="flex items-center gap-2">
              <CodeIcon className="w-4 h-4" />
              Open Source
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 border border-[#1a2540] flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#06b6d4]"
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-[#1a2540]">
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
              className="text-xs font-mono text-[#06b6d4] uppercase tracking-widest mb-4 block"
            >
              Process
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text-white"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#8899b4] max-w-xl mx-auto text-lg"
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
                icon: LockIcon,
                accent: "cyan",
              },
              {
                step: "02",
                title: "Agent Analyzes & Decides",
                description:
                  "Aegis runs verifiable inference on 0G Compute. Every reasoning step stored on 0G Storage. No black boxes.",
                icon: BrainIcon,
                accent: "blue",
              },
              {
                step: "03",
                title: "Execute & Verify",
                description:
                  "Proposed actions settle on 0G Chain. Every decision logged immutably. TEE attestation proves it was real.",
                icon: CheckIcon,
                accent: "green",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={scaleIn}
                className="relative p-8 border border-[#1a2540] bg-[#0d1321] card-hover group"
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl font-bold font-mono text-[#1a2540] group-hover:text-[#06b6d4] transition-colors duration-300">
                    {item.step}
                  </span>
                  <div className="flex-1 h-px bg-[#1a2540] group-hover:bg-[#06b6d4]/30 transition-colors duration-300" />
                </div>

                <div className={`w-12 h-12 flex items-center justify-center border mb-6 transition-all duration-300 ${
                  item.accent === "green"
                    ? "bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]"
                    : item.accent === "blue"
                    ? "bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6]"
                    : "bg-[#06b6d4]/10 border-[#06b6d4]/20 text-[#06b6d4]"
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-[#f0f6ff]">{item.title}</h3>
                <p className="text-sm text-[#8899b4] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-[#1a2540] bg-[#0a0f1a]">
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
              className="text-xs font-mono text-[#06b6d4] uppercase tracking-widest mb-4 block"
            >
              Capabilities
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text-white"
            >
              Built on 0G
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#8899b4] max-w-xl mx-auto text-lg"
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
                icon: BrainIcon,
                tag: "0G Compute",
                color: "cyan",
              },
              {
                title: "Persistent Memory",
                description:
                  "Agent reasoning, strategy evolution, and trade history stored permanently on 0G Storage. Your agent learns and improves — with a complete audit trail.",
                icon: DatabaseIcon,
                tag: "0G Storage",
                color: "blue",
              },
              {
                title: "On-Chain Settlement",
                description:
                  "Every proposed action settles on 0G Chain. Smart contracts enforce your rules. No silent failures. No hidden trades.",
                icon: LinkIcon,
                tag: "0G Chain",
                color: "cyan",
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
                className="p-8 border border-[#1a2540] bg-[#0d1321] card-hover"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center border transition-colors duration-300 ${
                    item.color === "green"
                      ? "bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]"
                      : item.color === "blue"
                      ? "bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6]"
                      : "bg-[#06b6d4]/10 border-[#06b6d4]/20 text-[#06b6d4]"
                  }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs font-mono px-3 py-1.5 ${
                      item.color === "green"
                        ? "text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20"
                        : item.color === "blue"
                        ? "text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/20"
                        : "text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/20"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#f0f6ff]">{item.title}</h3>
                <p className="text-sm text-[#8899b4] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-[#1a2540]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1a2540]"
          >
            {[
              { label: "Decisions Made", value: "0", suffix: "", icon: BrainIcon },
              { label: "Verifications", value: "0", suffix: "", icon: ShieldIcon },
              { label: "Uptime", value: "99.9", suffix: "%", icon: ZapIcon },
              { label: "Avg Response", value: "1.2", suffix: "s", icon: ZapIcon },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`p-8 text-center ${
                  i > 0 ? "border-l border-[#1a2540]" : ""
                }`}
              >
                <stat.icon className="w-5 h-5 text-[#4a5d80] mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold font-mono mb-2 text-[#f0f6ff]">
                  {stat.value}
                  <span className="text-[#06b6d4]">{stat.suffix}</span>
                </div>
                <div className="text-xs text-[#4a5d80] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-[#1a2540] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="ambient-glow w-[600px] h-[600px] bg-[#06b6d4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text-white"
          >
            Start Building Your Agent
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[#8899b4] mb-12 max-w-xl mx-auto text-lg"
          >
            Connect your wallet, configure your strategy, and let Aegis manage
            your DeFi portfolio with verifiable AI.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-[#f0f6ff] text-[#030712] text-base font-semibold hover:bg-[#f0f6ff]/90 transition-all duration-200"
            >
              Launch App
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#1a2540]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logos/aegis-logo.png" alt="Aegis" className="h-6 w-6" />
            <span className="text-sm font-medium text-[#f0f6ff]">Aegis</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#4a5d80]">
            <a href="#" className="hover:text-[#f0f6ff] transition-colors duration-200">
              Documentation
            </a>
            <a href="#" className="hover:text-[#f0f6ff] transition-colors duration-200">
              GitHub
            </a>
            <a href="#" className="hover:text-[#f0f6ff] transition-colors duration-200">
              Twitter
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#4a5d80]">
            <GlobeIcon className="w-3.5 h-3.5" />
            Built on 0G Network
          </div>
        </div>
      </footer>
    </div>
  );
}
