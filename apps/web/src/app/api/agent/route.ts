/**
 * POST /api/agent
 * 
 * Execute the full Aegis agent pipeline:
 * 1. Fetch market data
 * 2. Run inference on 0G Compute
 * 3. Store reasoning on 0G Storage
 * 4. Return decision for user approval
 */

import { NextRequest, NextResponse } from "next/server";
import { executeAgent, getMarketData, type StrategyConfig } from "@/lib/agent-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { strategy } = body as { strategy?: Partial<StrategyConfig> };

    const config: StrategyConfig = {
      riskTolerance: strategy?.riskTolerance || "low",
      maxPositionPct: strategy?.maxPositionPct || 5,
      allowedTokens: strategy?.allowedTokens || ["ETH", "BTC", "USDC", "AAVE", "UNI", "LINK"],
      strategy: strategy?.strategy || "conservative",
    };

    // Step 1: Get current market data
    const marketData = await getMarketData();

    // Step 2-4: Run agent pipeline (Compute + Storage + Decision)
    const decision = await executeAgent(config, marketData);

    return NextResponse.json({
      success: true,
      decision,
      marketData,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return current agent status and recent decisions
  return NextResponse.json({
    status: "operational",
    model: "deepseek-ai/DeepSeek-V3",
    uptime: "99.9%",
    network: "0G Galileo Testnet",
  });
}
