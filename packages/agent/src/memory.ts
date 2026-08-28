import { ZgFile, Indexer, MemData } from "@0gfoundation/0g-storage-ts-sdk";
import { ethers } from "ethers";
import { AgentDecision } from "./analyze";

const RPC_URL = "https://evmrpc-testnet.0g.ai";
const INDEXER_RPC = "https://indexer-storage-testnet-turbo.0g.ai";

export interface StoredDecision {
  id: string;
  timestamp: number;
  decision: AgentDecision;
  marketSnapshot: any;
  storageHash: string;
}

/**
 * Store agent decision reasoning on 0G Storage
 * This creates an immutable audit trail
 */
export async function storeDecision(
  provider: ethers.Wallet,
  decision: AgentDecision,
  marketSnapshot: any
): Promise<StoredDecision> {
  const indexer = new Indexer(INDEXER_RPC);

  // Create decision document
  const decisionDoc = {
    id: generateDecisionId(),
    timestamp: Date.now(),
    decision,
    marketSnapshot,
    agent: "Aegis Alpha",
    version: "0.1.0",
  };

  // Convert to bytes for storage
  const data = new TextEncoder().encode(JSON.stringify(decisionDoc, null, 2));
  const memData = new MemData(data);

  // Calculate merkle tree
  const [tree, treeErr] = await memData.merkleTree();
  if (treeErr !== null || !tree) {
    throw new Error(`Merkle tree error: ${treeErr}`);
  }

  const rootHash = tree.rootHash();

  // Upload to 0G Storage
  const [tx, uploadErr] = await indexer.upload(memData, RPC_URL, provider);
  if (uploadErr !== null) {
    throw new Error(`Upload error: ${uploadErr}`);
  }

  console.log(`Decision stored on 0G Storage: ${rootHash}`);

  return {
    id: decisionDoc.id,
    timestamp: decisionDoc.timestamp,
    decision,
    marketSnapshot,
    storageHash: rootHash,
  };
}

/**
 * Retrieve stored decision from 0G Storage
 */
export async function retrieveDecision(
  rootHash: string,
  outputPath: string
): Promise<StoredDecision> {
  const indexer = new Indexer(INDEXER_RPC);

  // Download from 0G Storage
  const err = await indexer.download(rootHash, outputPath, true);
  if (err !== null) {
    throw new Error(`Download error: ${err}`);
  }

  // Read and parse the file
  const fs = require("fs");
  const content = fs.readFileSync(outputPath, "utf-8");
  return JSON.parse(content);
}

/**
 * Store agent memory/context for persistent learning
 */
export async function storeAgentMemory(
  provider: ethers.Wallet,
  memory: {
    strategy: string;
    learnings: string[];
    performance: {
      totalDecisions: number;
      successfulDecisions: number;
      avgConfidence: number;
    };
    lastUpdated: number;
  }
): Promise<string> {
  const indexer = new Indexer(INDEXER_RPC);

  const data = new TextEncoder().encode(JSON.stringify(memory, null, 2));
  const memData = new MemData(data);

  const [tree, treeErr] = await memData.merkleTree();
  if (treeErr !== null || !tree) {
    throw new Error(`Merkle tree error: ${treeErr}`);
  }

  const [tx, uploadErr] = await indexer.upload(memData, RPC_URL, provider);
  if (uploadErr !== null) {
    throw new Error(`Upload error: ${uploadErr}`);
  }

  return tree!.rootHash();
}

function generateDecisionId(): string {
  return `decision-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
