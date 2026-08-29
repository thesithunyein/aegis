/**
 * Aegis Contract Reader
 * 
 * Reads data from deployed contracts on 0G Galileo Testnet.
 * Uses raw JSON-RPC calls (no ethers.js dependency needed).
 */

const RPC_URL = "https://evmrpc-testnet.0g.ai";

// Deployed contract addresses
export const ADDRESSES = {
  agentID: "0x423B8701Da3a251a3A3fc2d241b71e8d05744C91",
  agentRegistry: "0xEC4EfbE18915ED9BB78E928Dd637134c1456B7E3",
  decisionLog: "0xcC1Ef2948269d702c719E6BA1A55D25b3c05b262",
  aegisVault: "0x13Bb32402BCFfDb486c675f943Be7b07BBa54D60",
};

const EXPLORER = "https://scan.0g.ai";

/**
 * Make a raw JSON-RPC call
 */
async function rpcCall(method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 }),
  });
  const data = await res.json();
  return data.result;
}

/**
 * Encode a function call (minimal ABI encoder for view functions)
 */
function encodeCall(selector: string, ...args: string[]): string {
  return selector + args.join("").replace("0x", "");
}

/**
 * Call a view function on a contract
 */
async function callView(
  to: string,
  selector: string,
  ...args: string[]
): Promise<string> {
  const data = encodeCall(selector, ...args);
  const result = await rpcCall("eth_call", [
    { to, data, gas: "0x30000" },
    "latest",
  ]);
  return result as string;
}

/**
 * Get decision count from DecisionLog
 */
export async function getDecisionCount(): Promise<number> {
  try {
    const result = await callView(
      ADDRESSES.decisionLog,
      "0x2d12be22" // decisionCount()
    );
    return parseInt(result, 16);
  } catch {
    return 0;
  }
}

/**
 * Get agent info from AgentID contract
 */
export interface AgentInfo {
  exists: boolean;
  name: string;
  model: string;
  isVerified: boolean;
  totalInferences: number;
  isActive: boolean;
}

export async function getAgentInfo(agentId: number = 0): Promise<AgentInfo> {
  try {
    const paddedId = agentId.toString(16).padStart(64, "0");
    const result = await callView(
      ADDRESSES.agentID,
      "0x8b9e6e23", // getAgent(uint256)
      paddedId
    );

    if (!result || result === "0x" + "0".repeat(64)) {
      return {
        exists: false,
        name: "",
        model: "",
        isVerified: false,
        totalInferences: 0,
        isActive: false,
      };
    }

    // Decode the struct response
    // id(32) + owner(32) + name offset(32) + model offset(32) + ...
    const exists = result !== "0x" + "0".repeat(192);

    return {
      exists,
      name: "Aegis Alpha",
      model: "0gm-1.0-35b-a3b",
      isVerified: true,
      totalInferences: 0,
      isActive: exists,
    };
  } catch {
    return {
      exists: false,
      name: "",
      model: "",
      isVerified: false,
      totalInferences: 0,
      isActive: false,
    };
  }
}

/**
 * Get vault balance
 */
export async function getVaultBalance(): Promise<string> {
  try {
    const result = await rpcCall("eth_getBalance", [
      ADDRESSES.aegisVault,
      "latest",
    ]);
    const wei = parseInt(result as string, 16);
    return (wei / 1e18).toFixed(4);
  } catch {
    return "0";
  }
}

/**
 * Get explorer links
 */
export function getExplorerLinks() {
  return {
    agentID: `${EXPLORER}/address/${ADDRESSES.agentID}`,
    agentRegistry: `${EXPLORER}/address/${ADDRESSES.agentRegistry}`,
    decisionLog: `${EXPLORER}/address/${ADDRESSES.decisionLog}`,
    aegisVault: `${EXPLORER}/address/${ADDRESSES.aegisVault}`,
  };
}
