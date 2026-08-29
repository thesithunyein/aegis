/**
 * 0G Compute Client — Router path (OpenAI-compatible)
 * 
 * This is the REAL integration with 0G Compute network.
 * Uses the Router path which provides a single OpenAI-compatible endpoint.
 * 
 * Docs: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/router/overview
 * 
 * Mainnet Router: https://router-api.0g.ai/v1
 * Testnet Router: https://router-api-testnet.integratenetwork.work/v1
 */

import OpenAI from "openai";

const API_KEY = process.env.ZERO_G_COMPUTE_API_KEY || "";
// Router endpoint — OpenAI-compatible
const BASE_URL = "https://router-api.0g.ai/v1";

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
  model: string = "0gm-1.0-35b-a3b",
  options?: { temperature?: number; maxTokens?: number }
): Promise<ComputeResult> {
  if (!API_KEY) {
    throw new Error(
      "0G Compute API key not configured. Get one from pc.0g.ai → Settings → API Keys"
    );
  }

  const client = new OpenAI({
    baseURL: BASE_URL,
    apiKey: API_KEY,
  });

  const start = Date.now();

  const completion = await client.chat.completions.create({
    model,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 4096,
    response_format: { type: "json_object" },
  } as OpenAI.ChatCompletionCreateParamsNonStreaming);

  const latencyMs = Date.now() - start;
  const choice = completion.choices[0];

  // Some models (DeepSeek, etc.) put content in reasoning_content when thinking is on
  const msg = choice.message as unknown as Record<string, string>;
  const content = choice.message.content || msg.reasoning_content || "";

  return {
    model,
    content,
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
    return ["deepseek-v4-pro", "deepseek-v4-flash", "qwen3.8-max", "gpt-5.6-sol"];
  }

  const client = new OpenAI({
    baseURL: BASE_URL,
    apiKey: API_KEY,
  });

  try {
    const models = await client.models.list();
    return models.data.map((m) => m.id);
  } catch {
    return ["deepseek-v4-pro", "deepseek-v4-flash", "qwen3.8-max", "gpt-5.6-sol"];
  }
}
