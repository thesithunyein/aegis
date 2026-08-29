/**
 * POST /api/storage
 * 
 * Store data on 0G Storage network.
 * GET /api/storage?hash=xxx
 * 
 * Retrieve data from 0G Storage by root hash.
 */

import { NextRequest, NextResponse } from "next/server";
import { storeData, retrieveData } from "@/lib/0g-storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, metadata } = body;

    if (!data) {
      return NextResponse.json(
        { error: "data field is required" },
        { status: 400 }
      );
    }

    const result = await storeData(data, metadata);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const hash = req.nextUrl.searchParams.get("hash");

    if (!hash) {
      return NextResponse.json(
        { error: "hash query parameter is required" },
        { status: 400 }
      );
    }

    const data = await retrieveData(hash);

    return NextResponse.json({
      success: true,
      hash,
      data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
