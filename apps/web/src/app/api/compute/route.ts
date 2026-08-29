/**
 * POST /api/compute
 * 
 * Run inference on 0G Compute network.
 * This is the REAL endpoint that calls 0G Compute Router.
 */

import { NextRequest, NextResponse } from "next/server";
import { runInference } from "@/lib/0g-compute";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, model, temperature, maxTokens } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const result = await runInference(messages, model, {
      temperature,
      maxTokens,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
