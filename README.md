<div align="center">

<img src="apps/web/public/logos/aegis-logo.png" alt="Aegis" width="120" />

# Aegis

**Autonomous Intelligence, Verified On-Chain**

AI that manages your DeFi portfolio and proves every decision on-chain.

[![Deploy](https://img.shields.io/badge/Live-aegis.sithunyein.com-000?style=for-the-badge&labelColor=000&color=3B82F6)](https://aegis.sithunyein.com)
[![0G Network](https://img.shields.io/badge/Built%20on-0G-000?style=for-the-badge&labelColor=000&color=10B981)](https://0g.ai)

</div>

---

## What is Aegis?

Aegis is the first AI DeFi agent where **risk rules are enforced onchain — the agent literally cannot bypass them.**

Other AI agents do whatever they want. Aegis has on-chain guardrails:
- **Max position size** — enforced by smart contract, not just a suggestion
- **Allowed tokens** — agent cannot trade outside your whitelist
- **Risk tolerance** — AI reasoning is constrained by your risk level
- **Every decision** — logged on 0G Chain with TEE attestation proof

### How It Works

1. **Connect Wallet** → Set your risk rules in AegisVault contract
2. **Agent Analyzes** → Runs inference on 0G Compute (TEE-verified)
3. **Rules Enforced** → Smart contract ensures agent stays within bounds
4. **Decision Stored** → Full reasoning on 0G Storage (immutable)
5. **Verified** → TEE attestation proves inference was genuine

### What Makes Aegis Different

| Other AI Agents | Aegis |
|----------------|-------|
| AI can do whatever it wants | Risk rules enforced onchain |
| No proof inference ran | TEE attestation per decision |
| Decisions stored in database | Decisions on 0G Chain |
| Generic chatbot wrapper | ERC-7857 agent identity |

## How It Works

```
1. Connect Wallet → Set Strategy
2. Agent Analyzes Market (0G Compute)
3. Decision Stored (0G Storage)
4. Action Proposed → You Approve
5. Executed on 0G Chain
6. Every Step Verified (TEE Attestation)
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14, Tailwind CSS | Dashboard & landing page |
| Smart Contracts | Solidity, Foundry | Vault, DecisionLog, AgentRegistry |
| AI Inference | 0G Compute | Verifiable market analysis |
| Persistent Memory | 0G Storage | Immutable decision history |
| Settlement | 0G Chain | On-chain execution |
| Identity | ERC-7857 | Portable agent identity |

## Project Structure

```
aegis/
├── apps/
│   ├── web/              # Next.js frontend
│   └── contracts/        # Solidity smart contracts
├── packages/
│   └── agent/            # Core agent logic
└── docs/                 # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- 0G testnet wallet with OG tokens
- [faucet.0g.ai](https://faucet.0g.ai)

### Installation

```bash
# Clone
git clone https://github.com/SithuNyein/aegis.git
cd aegis

# Install dependencies
npm install

# Start development
npm run dev
```

### Smart Contracts

```bash
cd apps/contracts

# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Deploy to 0G testnet
forge script script/Deploy.s.sol --rpc-url https://evmrpc-testnet.0g.ai --broadcast
```

## Architecture

### Agent Flow

1. **Analyze**: Agent reads market data, runs inference on 0G Compute
2. **Decide**: AI produces structured decision with confidence score
3. **Store**: Full reasoning stored on 0G Storage (immutable)
4. **Propose**: Decision submitted to AegisVault contract
5. **Approve**: User reviews and approves action
6. **Execute**: Action settles on 0G Chain
7. **Verify**: TEE attestation proves inference was genuine

### Smart Contracts

- **AegisVault**: User funds + agent permissions
- **DecisionLog**: Immutable decision audit trail
- **AgentRegistry**: ERC-7857 agent identity

## Deployment

**Live Site**: [aegis.sithunyein.com](https://aegis.sithunyein.com)

**Deployed Contracts (0G Galileo Testnet — Chain 16602)**

| Contract | Address | Explorer |
|----------|---------|----------|
| **AgentID (ERC-7857)** | `0x423B8701Da3a251a3A3fc2d241b71e8d05744C91` | [View](https://chainscan-galileo.0g.ai/address/0x423B8701Da3a251a3A3fc2d241b71e8d05744C91) |
| **AgentRegistry** | `0xEC4EfbE18915ED9BB78E928Dd637134c1456B7E3` | [View](https://chainscan-galileo.0g.ai/address/0xEC4EfbE18915ED9BB78E928Dd637134c1456B7E3) |
| **DecisionLog** | `0xcC1Ef2948269d702c719E6BA1A55D25b3c05b262` | [View](https://chainscan-galileo.0g.ai/address/0xcC1Ef2948269d702c719E6BA1A55D25b3c05b262) |
| **AegisVault** | `0x13Bb32402BCFfDb486c675f943Be7b07BBa54D60` | [View](https://chainscan-galileo.0g.ai/address/0x13Bb32402BCFfDb486c675f943Be7b07BBa54D60) |

**Deployer**: `0x7A35f63F81357DaDE2cff8f5699b935786Aa9Da2`

## Built for

[0G Bridge Buildathon](https://app.akindo.io/wave-hacks/Z4MlX4vreI72ol6pd) by AKINDO

## License

MIT

---

<div align="center">

Built on [0G Network](https://0g.ai) • Verified • Autonomous

</div>
