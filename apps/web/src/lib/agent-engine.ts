/**
 * Aegis Agent Engine — Real autonomous agent logic
 * 
 * This is the core brain of Aegis. It:
 * 1. Analyzes market data via 0G Compute
 * 2. Makes decisions based on strategy parameters
 * 3. Stores reasoning on 0G Storage
 * 4. Logs everything on 0G Chain
 */

import { runInference, type ComputeResult } from "./0g-compute";
import { storeData, type StorageResult } from "./0g-storage";

export interface StrategyConfig {
  riskTolerance: "low" | "medium" | "high";
  maxPositionPct: number;
  allowedTokens: string[];
  strategy: "conservative" | "moderate" | "aggressive";
}

export interface MarketData {
  prices: Record<string, number>;
  yields: Record<string, number>;
  positions: Array<{
    token: string;
    amount: number;
    value: number;
    protocol: string;
  }>;
}

export interface AgentDecision {
  id: string;
  timestamp: string;
  action: string;
  reasoning: string;
  confidence: number;
  riskScore: number;
  model: string;
  computeResult: ComputeResult;
  storageResult: StorageResult;
  status: "proposed" | "executed" | "rejected";
}

/**
 * System prompt for the Aegis agent
 */
function getSystemPrompt(strategy: StrategyConfig): string {
  return `You are Aegis, an autonomous DeFi portfolio manager running on 0G Network.

Your role: Analyze the user's DeFi portfolio and propose specific actions to optimize yield while managing risk.

Strategy Parameters:
- Risk Tolerance: ${strategy.riskTolerance}
- Max Position Size: ${strategy.maxPositionPct}% of portfolio
- Strategy: ${strategy.strategy}
- Allowed Tokens: ${strategy.allowedTokens.join(", ")}

Rules:
1. Never propose risking more than ${strategy.maxPositionPct}% on any single position
2. Always explain your reasoning clearly
3. Assign a confidence score (0-100) based on data quality
4. Assign a risk score (0-100) based on potential downside
5. If risk is too high, recommend holding (no action)

CRITICAL: Your ENTIRE response must be a single valid JSON object. No thinking, no explanation, no markdown, no code blocks. Just the raw JSON object.

Format:
{"action":"string","reasoning":"string","confidence":0-100,"riskScore":0-100,"token":"string","protocol":"string","expectedImpact":"string"}
`;
}

/**
 * Build market analysis prompt from current data
 */
function getAnalysisPrompt(marketData: MarketData): string {
  const priceStr = Object.entries(marketData.prices)
    .map(([token, price]) => `${token}: $${price.toLocaleString()}`)
    .join("\n");

  const yieldStr = Object.entries(marketData.yields)
    .map(([token, apy]) => `${token}: ${apy}% APY`)
    .join("\n");

  const positionStr = marketData.positions
    .map(
      (p) =>
        `${p.token} on ${p.protocol}: ${p.amount} tokens ($${p.value.toLocaleString()})`
    )
    .join("\n");

  return `Current Market Data:
${priceStr}

DeFi Yields:
${yieldStr}

Current Positions:
${positionStr}

Total Portfolio Value: $${marketData.positions.reduce((sum, p) => sum + p.value, 0).toLocaleString()}

Analyze this portfolio and propose the optimal next action. Consider:
1. Are there yield opportunities being missed?
2. Are any positions too concentrated?
3. Is there rebalancing needed?
4. Are there rewards to claim?

Reply with ONLY the JSON object above. No other text.`;
}

/**
 * Run the full agent pipeline
 * 1. Analyze market data via 0G Compute
 * 2. Store reasoning on 0G Storage
 * 3. Return decision for on-chain execution
 */
export async function executeAgent(
  strategy: StrategyConfig,
  marketData: MarketData
): Promise<AgentDecision> {
  const decisionId = `decision-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Step 1: Run inference on 0G Compute
  const messages = [
    { role: "system" as const, content: getSystemPrompt(strategy) },
    { role: "user" as const, content: getAnalysisPrompt(marketData) },
  ];

  const computeResult = await runInference(messages, "0gm-1.0-35b-a3b", {
    temperature: 0.3,
    maxTokens: 4096,
  });

  // Parse the AI response
  let parsed: Record<string, unknown>;
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = computeResult.content.match(/\{[\s\S]*\}/);
    parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
  } catch {
    parsed = {
      action: "Hold current positions",
      reasoning: "Unable to parse AI response. Holding for safety.",
      confidence: 30,
      riskScore: 50,
    };
  }

  // Step 2: Store reasoning on 0G Storage
  const storageResult = await storeData(
    {
      decisionId,
      strategy,
      marketData,
      aiResponse: parsed,
      rawOutput: computeResult.content,
      model: computeResult.model,
      tokens: computeResult.usage,
      latencyMs: computeResult.latencyMs,
    },
    { agentId: "aegis-alpha", decisionId }
  );

  // Step 3: Build the decision
  const decision: AgentDecision = {
    id: decisionId,
    timestamp: new Date().toISOString(),
    action: (parsed.action as string) || "No action proposed",
    reasoning: (parsed.reasoning as string) || "No reasoning available",
    confidence: (parsed.confidence as number) || 50,
    riskScore: (parsed.riskScore as number) || 50,
    model: computeResult.model,
    computeResult,
    storageResult,
    status: "proposed",
  };

  return decision;
}

/**
 * Get real-time market data (mock for MVP, would connect to oracles)
 */
export async function getMarketData(): Promise<MarketData> {
  // TODO: Connect to Chainlink oracle or DeFi API for real prices
  // For now, use realistic mock data that represents current DeFi state
  return {
    prices: {
      ETH: 4521.32,
      BTC: 112450.0,
      USDC: 1.0,
      AAVE: 312.45,
      UNI: 11.82,
      LINK: 18.92,
    },
    yields: {
      "ETH-staking": 3.8,
      "USDC-lending": 5.2,
      "AAVE-supply": 4.1,
      "UNI-LP": 12.5,
    },
    positions: [
      { token: "ETH", amount: 2.5, value: 11303.3, protocol: "Aave V3" },
      { token: "USDC", amount: 8500, value: 8500, protocol: "Compound" },
      { token: "AAVE", amount: 15, value: 4686.75, protocol: "Staked" },
      { token: "UNI", amount: 200, value: 2364, protocol: "Uniswap V3 LP" },
    ],
  };
}
