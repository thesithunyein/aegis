/**
 * Aegis Contract Configuration — 0G Mainnet
 * 
 * After deployment, update these addresses with your deployed contract addresses.
 * These are used by the dashboard to show on-chain proof.
 */

export const ZERO_G_CHAIN = {
  chainId: 16602,
  name: "0G Galileo Testnet",
  rpcUrl: "https://evmrpc-testnet.0g.ai",
  explorerUrl: "https://chainscan-galileo.0g.ai",
};

export const CONTRACTS = {
  agentID: "0x423B8701Da3a251a3A3fc2d241b71e8d05744C91",
  decisionLog: "0xcC1Ef2948269d702c719E6BA1A55D25b3c05b262",
  agentRegistry: "0xEC4EfbE18915ED9BB78E928Dd637134c1456B7E3",
  aegisVault: "0x13Bb32402BCFfDb486c675f943Be7b07BBa54D60",
};

// Minimal ABI for reading decision data on-chain
export const DECISION_LOG_ABI = [
  "function getDecision(uint256 id) view returns (uint256 id, address agent, uint256 timestamp, bytes32 reasoningHash, string action, uint256 confidence, bool executed, bytes32 txHash, bool verified)",
  "function decisionCount() view returns (uint256)",
  "function logDecision(bytes32 reasoningHash, string action, uint256 confidence) returns (uint256)",
  "function markExecuted(uint256 id, bytes32 txHash)",
  "function verifyDecision(uint256 id)",
] as const;

export const AGENT_ID_ABI = [
  "function createAgent(string name, string model, string metadataURI, bytes32 teeAttestation) returns (uint256)",
  "function recordInference(uint256 agentId, bytes32 proofHash)",
  "function getAgent(uint256 id) view returns (uint256 id, address owner, string name, string model, string metadataURI, bytes32 teeAttestation, uint256 createdAt, uint256 lastActiveAt, uint256 totalInferences, bool isActive, bool isVerified)",
  "function getInferenceProofs(uint256 agentId) view returns (bytes32[])",
] as const;

/**
 * Get the explorer link for a transaction
 */
export function getTxExplorerLink(txHash: string): string {
  return `${ZERO_G_CHAIN.explorerUrl}/tx/${txHash}`;
}

/**
 * Get the explorer link for a contract
 */
export function getContractExplorerLink(address: string): string {
  return `${ZERO_G_CHAIN.explorerUrl}/address/${address}`;
}
