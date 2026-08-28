import { ethers } from "ethers";
import { AgentDecision } from "./analyze";

// Contract ABIs (simplified)
const VAULT_ABI = [
  "function proposeAction(address target, uint256 value, bytes data) external returns (uint256)",
  "function approveAndExecute(uint256 actionId) external",
  "function getBalance() external view returns (uint256)",
  "function getPendingActionsCount() external view returns (uint256)",
];

const DECISION_LOG_ABI = [
  "function logDecision(bytes32 reasoningHash, string action, uint256 confidence) external returns (uint256)",
  "function markExecuted(uint256 id, bytes32 txHash) external",
  "function verifyDecision(uint256 id) external",
];

const REGISTRY_ABI = [
  "function registerAgent(string name, string metadataURI) external returns (uint256)",
  "function recordDecision(uint256 id, bool success) external",
];

// Contract addresses on 0G Galileo Testnet
const CONTRACTS = {
  vault: "0x0000000000000000000000000000000000000000", // Deploy and replace
  decisionLog: "0x0000000000000000000000000000000000000000",
  registry: "0x0000000000000000000000000000000000000000",
};

export interface ExecutionResult {
  success: boolean;
  txHash: string;
  decisionLogId?: number;
  gasUsed?: string;
}

/**
 * Execute an agent decision on 0G Chain
 */
export async function executeDecision(
  provider: ethers.Wallet,
  decision: AgentDecision,
  reasoningHash: string
): Promise<ExecutionResult> {
  const vault = new ethers.Contract(CONTRACTS.vault, VAULT_ABI, provider);
  const decisionLog = new ethers.Contract(
    CONTRACTS.decisionLog,
    DECISION_LOG_ABI,
    provider
  );

  try {
    // 1. Log the decision on-chain
    const confidenceBp = BigInt(decision.confidence * 100); // Convert to basis points
    const logTx = await decisionLog.logDecision(
      ethers.encodeBytes32String(reasoningHash.slice(0, 31)),
      decision.action,
      confidenceBp
    );
    const logReceipt = await logTx.wait();

    // Get decision ID from event
    const logEvent = logReceipt.logs.find(
      (log: any) => log.fragment?.name === "DecisionLogged"
    );
    const decisionLogId = logEvent ? Number(logEvent.args[0]) : 0;

    // 2. Propose action to vault
    let txHash = "";
    if (decision.action !== "hold") {
      const proposeTx = await vault.proposeAction(
        getTargetAddress(decision),
        getTradeValue(decision),
        getTradeData(decision)
      );
      const proposeReceipt = await proposeTx.wait();
      txHash = proposeReceipt.hash;

      // Mark as executed in decision log
      await decisionLog.markExecuted(
        decisionLogId,
        ethers.encodeBytes32String(txHash.slice(0, 31))
      );
    }

    // 3. Record decision for agent
    const registry = new ethers.Contract(CONTRACTS.registry, REGISTRY_ABI, provider);
    await registry.recordDecision(1, true); // Agent ID 1

    return {
      success: true,
      txHash,
      decisionLogId,
      gasUsed: logReceipt.gasUsed.toString(),
    };
  } catch (error) {
    console.error("Execution failed:", error);
    return {
      success: false,
      txHash: "",
    };
  }
}

/**
 * Get target address based on decision
 */
function getTargetAddress(decision: AgentDecision): string {
  // In production, map token symbols to contract addresses
  // For now, return zero address (ETH transfer)
  return ethers.ZeroAddress;
}

/**
 * Get trade value in wei
 */
function getTradeValue(decision: AgentDecision): bigint {
  if (!decision.amount) return 0n;
  // Parse amount string to wei
  return ethers.parseEther(decision.amount);
}

/**
 * Get trade calldata
 */
function getTradeData(decision: AgentDecision): string {
  // In production, encode proper calldata for DEX swaps
  // For now, return empty bytes
  return "0x";
}

/**
 * Deploy vault for a new user
 */
export async function deployVault(
  provider: ethers.Wallet
): Promise<string> {
  // In production, deploy AegisVault contract
  // For now, return placeholder
  console.log("Deploying vault for:", provider.address);
  return CONTRACTS.vault;
}
