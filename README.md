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

Aegis is an autonomous AI agent that manages your DeFi portfolio with verifiable intelligence. Every decision is:

- **Analyzed** on 0G Compute (TEE-verified inference)
- **Stored** on 0G Storage (immutable audit trail)
- **Executed** on 0G Chain (on-chain settlement)
- **Verified** via cryptographic proof (no black boxes)

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

Live at: [aegis.sithunyein.com](https://aegis.sithunyein.com)

## Built for

[0G Bridge Buildathon](https://app.akindo.io/wave-hacks/Z4MlX4vreI72ol6pd) by AKINDO

## License

MIT

---

<div align="center">

Built on [0G Network](https://0g.ai) • Verified • Autonomous

</div>
