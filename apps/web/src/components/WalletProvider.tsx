"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

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

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (typeof window === "undefined") return;

    // @ts-expect-error ethereum may not be defined
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("Please install MetaMask to use Aegis");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const chainIdHex = await ethereum.request({ method: "eth_chainId" });
      const bal = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });

      setAddress(accounts[0]);
      setChainId(parseInt(chainIdHex, 16));
      setBalance((parseInt(bal, 16) / 1e18).toFixed(4));
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
  }, []);

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
