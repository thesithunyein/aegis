// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/AegisVault.sol";
import "../src/DecisionLog.sol";
import "../src/AgentRegistry.sol";
import "../src/AgentID.sol";

/**
 * Deploy all Aegis contracts to 0G mainnet
 * 
 * Usage:
 *   forge script script/Deploy.s.sol --rpc-url https://evmrpc.0g.ai --broadcast --verify
 */
contract DeployScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying Aegis contracts to 0G Mainnet...");
        console.log("Deployer:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy AgentID (ERC-7857)
        AgentID agentID = new AgentID();
        console.log("AgentID deployed at:", address(agentID));

        // 2. Deploy AgentRegistry
        AgentRegistry registry = new AgentRegistry();
        console.log("AgentRegistry deployed at:", address(registry));

        // 3. Deploy DecisionLog
        DecisionLog decisionLog = new DecisionLog();
        console.log("DecisionLog deployed at:", address(decisionLog));

        // 4. Deploy AegisVault
        AegisVault vault = new AegisVault();
        console.log("AegisVault deployed at:", address(vault));

        vm.stopBroadcast();

        console.log("\n=== Deployment Complete ===");
        console.log("AgentID (ERC-7857):", address(agentID));
        console.log("AgentRegistry:", address(registry));
        console.log("DecisionLog:", address(decisionLog));
        console.log("AegisVault:", address(vault));
        console.log("\nUpdate your .env and contract config with these addresses!");
    }
}
