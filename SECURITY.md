# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within Aegis, please send an email to sithunyein.mailto@gmail.com. All security vulnerabilities will be promptly addressed.

**Please do NOT report security vulnerabilities through public GitHub issues.**

## Response Timeline

- **Acknowledgment**: Within 24 hours
- **Initial assessment**: Within 48 hours
- **Fix deployment**: Within 7 days for critical vulnerabilities

## Scope

This security policy applies to:

- The Aegis smart contracts (AegisVault, DecisionLog, AgentID, AgentRegistry)
- The Aegis web application (aegis.sithunyein.com)
- The Aegis API endpoints

## Smart Contract Security

### Risk Enforcement

Aegis enforces risk constraints as immutable smart contract rules:

- **Max Position Size** — The agent cannot allocate more than the configured percentage to any single position
- **Allowed Tokens** — The agent can only interact with pre-approved token addresses
- **Risk Tolerance** — Low/Medium/High settings determine the agent's behavior bounds

### TEE Verification

All AI inference is executed within a Trusted Execution Environment (TEE) via 0G Compute. Each decision includes a cryptographic attestation hash that can be independently verified.

### Audit Trail

Every agent decision is logged on-chain via the DecisionLog contract, providing an immutable record of all actions.

### Access Control

- Only the vault owner can configure agent parameters
- Only the registered agent can propose actions
- Only the owner can approve and execute proposed actions
- All state changes are validated by the smart contract

## Known Limitations

- Smart contracts are deployed on 0G Galileo Testnet (Chain ID 16602)
- TEE attestation is verified by 0G Compute infrastructure
- Agent decisions are recommendations — execution requires user confirmation
- The system does not hold or manage user funds directly
- Market data is sourced from CoinGecko (not on-chain oracles)

## Best Practices

1. **Verify TEE Attestation** — Always check the attestation hash before trusting a decision
2. **Review Risk Rules** — Ensure your vault's risk parameters match your intended limits
3. **Monitor On-Chain Activity** — Use the DecisionLog contract to audit agent actions
4. **Use a Dedicated Wallet** — Consider using a separate wallet for AI-managed positions
5. **Keep Software Updated** — Use the latest version of MetaMask and browsers

## Audit Status

- Internal review completed
- Smart contracts use OpenZeppelin libraries
- All public functions have access control
- Tests cover core functionality (8/8 passing)

## Updates

Security updates will be posted in the GitHub Releases and announced on X/Twitter.
