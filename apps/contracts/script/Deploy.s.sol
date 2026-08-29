// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AegisVault.sol";
import "../src/DecisionLog.sol";
import "../src/AgentRegistry.sol";

/**
 * Deploy all Aegis contracts to 0G testnet
 * 
 * Usage:
 *   forge script script/Deploy.s.sol --rpc-url https://evmrpc-testnet.0g.ai --broadcast
 */
contract DeployScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying Aegis contracts...");
        console.log("Deployer:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy AgentRegistry
        AgentRegistry registry = new AgentRegistry();
        console.log("AgentRegistry deployed at:", address(registry));

        // 2. Deploy DecisionLog
        DecisionLog decisionLog = new DecisionLog();
        console.log("DecisionLog deployed at:", address(decisionLog));

        // 3. Deploy AegisVault
        AegisVault vault = new AegisVault(
            address(registry),
            address(decisionLog)
        );
        console.log("AegisVault deployed at:", address(vault));

        vm.stopBroadcast();

        console.log("\n=== Deployment Complete ===");
        console.log("AgentRegistry:", address(registry));
        console.log("DecisionLog:", address(decisionLog));
        console.log("AegisVault:", address(vault));
        console.log("\nUpdate your .env with these addresses!");
    }
}
