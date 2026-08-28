import { createZGComputeNetworkBroker } from "@0gfoundation/0g-compute-ts-sdk";
import { ethers } from "ethers";

export interface MarketData {
  portfolio: {
    eth: number;
    usdc: number;
    uni: number;
    aave: number;
  };
  prices: {
    eth: number;
    uni: number;
    aave: number;
  };
  gasPrice: number;
  timestamp: number;
}

export interface AgentDecision {
  action: string;
  reasoning: string;
  confidence: number;
  riskScore: number;
  targetToken?: string;
  amount?: string;
  rationale: string;
}

/**
 * Analyze market data using 0G Compute for verifiable inference
 */
export async function analyzeMarket(
  provider: ethers.Wallet,
  marketData: MarketData
): Promise<AgentDecision> {
  // Initialize 0G Compute broker
  const broker = await createZGComputeNetworkBroker(provider);

  // List available services
  const services = await broker.inference.listService();
  const chatService = services.find(
    (s) => s.serviceType === "chatbot" && s.model.includes("deepseek")
  );

  if (!chatService) {
    throw new Error("No chatbot service available on 0G Compute");
  }

  // Fund the provider sub-account (min 1 OG)
  const serviceUrl = chatService.url;
  const serviceModel = chatService.model;

  // Build the prompt with market data
  const prompt = buildAnalysisPrompt(marketData);

  // Run inference via 0G Compute (TEE-verified)
  const response = await fetch(`${serviceUrl}/v1/proxy/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAuthToken(provider, chatService)}`,
    },
    body: JSON.stringify({
      model: serviceModel,
      messages: [
        {
          role: "system",
          content: `You are Aegis, an autonomous DeFi portfolio manager. You analyze market data and make trading decisions. Always respond in JSON format with: action, reasoning, confidence (0-100), riskScore (0-100), targetToken, amount, rationale. Be conservative and risk-aware.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    }),
  });

  const result = await response.json();
  const content = result.choices[0].message.content;

  // Parse the decision
  return parseDecision(content, marketData);
}

function buildAnalysisPrompt(data: MarketData): string {
  return `Analyze this DeFi portfolio and recommend an action:

Portfolio:
- ETH: ${data.portfolio.eth} (${((data.portfolio.eth * data.prices.eth) / 1000).toFixed(2)}k value)
- USDC: ${data.portfolio.usdc}
- UNI: ${data.portfolio.uni} (${((data.portfolio.uni * data.prices.uni) / 1000).toFixed(2)}k value)
- AAVE: ${data.portfolio.aave} (${((data.portfolio.aave * data.prices.aave) / 1000).toFixed(2)}k value)

Market Prices:
- ETH: $${data.prices.eth}
- UNI: $${data.prices.uni}
- AAVE: $${data.prices.aave}

Gas Price: ${data.gasPrice} gwei
Timestamp: ${new Date(data.timestamp * 1000).toISOString()}

Recommend ONE action: rebalance, claim rewards, hold, or exit position. Be specific about amounts and reasoning.`;
}

function parseDecision(content: string, data: MarketData): AgentDecision {
  try {
    // Try to parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        action: parsed.action || "hold",
        reasoning: parsed.reasoning || content,
        confidence: Math.min(100, Math.max(0, parsed.confidence || 50)),
        riskScore: Math.min(100, Math.max(0, parsed.riskScore || 50)),
        targetToken: parsed.targetToken,
        amount: parsed.amount,
        rationale: parsed.rationale || parsed.reasoning || content,
      };
    }
  } catch (e) {
    // Fallback if JSON parsing fails
  }

  // Default conservative decision
  return {
    action: "hold",
    reasoning: content,
    confidence: 50,
    riskScore: 30,
    rationale: "Unable to parse structured response. Defaulting to hold.",
  };
}

async function getAuthToken(
  provider: ethers.Wallet,
  service: any
): Promise<string> {
  // In production, this would use the 0G Compute SDK to get auth token
  // For now, return a placeholder
  return "app-sk-placeholder";
}
