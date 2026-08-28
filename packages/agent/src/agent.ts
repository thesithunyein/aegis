import { ethers } from "ethers";
import { analyzeMarket, MarketData, AgentDecision } from "./analyze";
import { storeDecision, StoredDecision } from "./memory";
import { executeDecision, ExecutionResult } from "./execute";
import { verifyInference, VerificationResult } from "./verify";

export interface AgentConfig {
  name: string;
  strategy: "conservative" | "moderate" | "aggressive";
  maxPositionPercent: number;
  maxTradeSize: string;
  riskTolerance: "low" | "medium" | "high";
}

export interface AgentState {
  config: AgentConfig;
  totalDecisions: number;
  successfulDecisions: number;
  lastDecision?: StoredDecision;
  isRunning: boolean;
}

/**
 * Aegis Agent - Autonomous DeFi Portfolio Manager
 *
 * This agent:
 * 1. Analyzes market data using 0G Compute (verifiable inference)
 * 2. Stores reasoning on 0G Storage (persistent memory)
 * 3. Executes decisions on 0G Chain (on-chain settlement)
 * 4. Verifies every step via TEE attestation
 */
export class AegisAgent {
  private provider: ethers.Wallet;
  private config: AgentConfig;
  private state: AgentState;
  private rpcUrl: string;

  constructor(
    privateKey: string,
    config: AgentConfig,
    rpcUrl: string = "https://evmrpc-testnet.0g.ai"
  ) {
    this.provider = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(rpcUrl)
    );
    this.config = config;
    this.rpcUrl = rpcUrl;
    this.state = {
      config,
      totalDecisions: 0,
      successfulDecisions: 0,
      isRunning: false,
    };
  }

  /**
   * Start the agent
   */
  async start(): Promise<void> {
    console.log(`[${this.config.name}] Starting agent...`);
    this.state.isRunning = true;
    console.log(`[${this.config.name}] Agent started`);
  }

  /**
   * Stop the agent
   */
  stop(): void {
    console.log(`[${this.config.name}] Stopping agent...`);
    this.state.isRunning = false;
    console.log(`[${this.config.name}] Agent stopped`);
  }

  /**
   * Run one analysis cycle
   */
  async runCycle(marketData: MarketData): Promise<{
    decision: AgentDecision;
    storage: StoredDecision;
    execution: ExecutionResult;
    verification: VerificationResult;
  }> {
    console.log(`[${this.config.name}] Analyzing market data...`);

    // 1. Analyze market using 0G Compute
    const decision = await analyzeMarket(this.provider, marketData);
    console.log(`[${this.config.name}] Decision: ${decision.action} (${decision.confidence}% confidence)`);

    // 2. Store reasoning on 0G Storage
    const storage = await storeDecision(this.provider, decision, marketData);
    console.log(`[${this.config.name}] Stored on 0G: ${storage.storageHash}`);

    // 3. Execute on 0G Chain
    const execution = await executeDecision(
      this.provider,
      decision,
      storage.storageHash
    );
    console.log(`[${this.config.name}] Executed: ${execution.success}`);

    // 4. Verify TEE attestation
    const verification = await verifyInference(
      "0x0000000000000000000000000000000000000000",
      storage.storageHash
    );
    console.log(`[${this.config.name}] Verified: ${verification.verified}`);

    // Update state
    this.state.totalDecisions++;
    if (execution.success) {
      this.state.successfulDecisions++;
    }
    this.state.lastDecision = storage;

    return {
      decision,
      storage,
      execution,
      verification,
    };
  }

  /**
   * Get agent state
   */
  getState(): AgentState {
    return { ...this.state };
  }

  /**
   * Get agent metrics
   */
  getMetrics() {
    return {
      name: this.config.name,
      strategy: this.config.strategy,
      totalDecisions: this.state.totalDecisions,
      successRate:
        this.state.totalDecisions > 0
          ? (this.state.successfulDecisions / this.state.totalDecisions) * 100
          : 0,
      isRunning: this.state.isRunning,
      address: this.provider.address,
    };
  }
}
