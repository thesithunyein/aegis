"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: "0",
  chainId: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
});

const STORAGE_KEY = "aegis_wallet_connected";

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // On mount: check if user was previously connected and auto-reconnect
  useEffect(() => {
    const wasConnected = localStorage.getItem(STORAGE_KEY);
    if (wasConnected === "true" && typeof window !== "undefined" && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((result) => {
          const accounts = result as string[];
          if (accounts && accounts.length > 0) {
            // User is still connected in MetaMask — restore session
            window.ethereum!.request({ method: "eth_chainId" }).then((chain) => {
              setChainId(parseInt(chain as string, 16));
            });
            window.ethereum!
              .request({ method: "eth_getBalance", params: [accounts[0], "latest"] })
              .then((bal) => {
                setBalance((parseInt(bal as string, 16) / 1e18).toFixed(4));
              });
            setAddress(accounts[0]);
          } else {
            // MetaMask is locked or disconnected — clear state
            localStorage.removeItem(STORAGE_KEY);
          }
        })
        .catch(() => {
          localStorage.removeItem(STORAGE_KEY);
        });
    }
    setHydrated(true);
  }, []);

  // Listen for account/chain changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        // User disconnected from MetaMask
        setAddress(null);
        setBalance("0");
        setChainId(null);
        localStorage.removeItem(STORAGE_KEY);
      } else if (address) {
        setAddress(accounts[0]);
        window.ethereum!.request({ method: "eth_getBalance", params: [accounts[0], "latest"] }).then((result) => {
          const bal = result as string;
          setBalance((parseInt(bal, 16) / 1e18).toFixed(4));
        });
      }
    };

    const handleChainChanged = (...args: unknown[]) => {
      const chain = args[0] as string;
      setChainId(parseInt(chain, 16));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [address]);

  const connect = useCallback(async () => {
    if (typeof window === "undefined") return;
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("Please install MetaMask to use Aegis");
      return;
    }

    setIsConnecting(true);
    try {
      const accountsRaw = await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = accountsRaw as string[];
      const chainIdHex = (await ethereum.request({ method: "eth_chainId" })) as string;
      const bal = (await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })) as string;

      setAddress(accounts[0]);
      setChainId(parseInt(chainIdHex, 16));
      setBalance((parseInt(bal, 16) / 1e18).toFixed(4));
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance("0");
    setChainId(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Don't render until hydration check is done
  if (!hydrated) {
    return <>{children}</>;
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected: !!address,
        address,
        balance,
        chainId,
        connect,
        disconnect,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

// Extend Window for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}
