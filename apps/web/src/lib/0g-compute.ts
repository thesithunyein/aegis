/**
 * 0G Compute Client — Router path (OpenAI-compatible)
 * 
 * This is the REAL integration with 0G Compute network.
 * Uses the Router path which provides a single OpenAI-compatible endpoint.
 * 
 * Docs: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/inference
 */

import OpenAI from "openai";

const API_KEY = process.env.ZERO_G_COMPUTE_API_KEY || "";
const BASE_URL = process.env.ZERO_G_COMPUTE_BASE_URL || "https://rpc.0g.ai";

export interface ComputeResult {
  model: string;
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs: number;
}

/**
 * Run inference on 0G Compute network
 * This calls the REAL 0G Compute Router endpoint
 */
export async function runInference(
  messages: OpenAI.ChatCompletionMessageParam[],
  model: string = "deepseek-ai/DeepSeek-V3",
  options?: { temperature?: number; maxTokens?: number }
): Promise<ComputeResult> {
  if (!API_KEY) {
    throw new Error(
      "0G Compute API key not configured. Get one from pc.0g.ai → Settings → API Keys"
    );
  }

  const client = new OpenAI({
    baseURL: `${BASE_URL}/v1/proxy`,
    apiKey: API_KEY,
  });

  const start = Date.now();

  const completion = await client.chat.completions.create({
    model,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 1024,
  });

  const latencyMs = Date.now() - start;
  const choice = completion.choices[0];

  return {
    model,
    content: choice.message.content || "",
    usage: {
      promptTokens: completion.usage?.prompt_tokens ?? 0,
      completionTokens: completion.usage?.completion_tokens ?? 0,
      totalTokens: completion.usage?.total_tokens ?? 0,
    },
    latencyMs,
  };
}

/**
 * List available models on 0G Compute
 */
export async function listModels(): Promise<string[]> {
  if (!API_KEY) {
    return ["deepseek-ai/DeepSeek-V3", "gpt-4o-mini", "qwen-2.5-72b-instruct"];
  }

  const client = new OpenAI({
    baseURL: `${BASE_URL}/v1/proxy`,
    apiKey: API_KEY,
  });

  try {
    const models = await client.models.list();
    return models.data.map((m) => m.id);
  } catch {
    return ["deepseek-ai/DeepSeek-V3", "gpt-4o-mini", "qwen-2.5-72b-instruct"];
  }
}
