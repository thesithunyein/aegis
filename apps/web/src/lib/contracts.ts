/**
 * Aegis Contract Configuration — 0G Mainnet
 * 
 * After deployment, update these addresses with your deployed contract addresses.
 * These are used by the dashboard to show on-chain proof.
 */

export const ZERO_G_CHAIN = {
  chainId: 16600,
  name: "0G Mainnet",
  rpcUrl: "https://evmrpc.0g.ai",
  explorerUrl: "https://scan.0g.ai",
};

export const CONTRACTS = {
  // Deployed contract addresses — update after deployment
  agentID: process.env.NEXT_PUBLIC_AGENT_ID_ADDRESS || "",
  decisionLog: process.env.NEXT_PUBLIC_DECISION_LOG_ADDRESS || "",
  agentRegistry: process.env.NEXT_PUBLIC_AGENT_REGISTRY_ADDRESS || "",
  aegisVault: process.env.NEXT_PUBLIC_AEGIS_VAULT_ADDRESS || "",
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
