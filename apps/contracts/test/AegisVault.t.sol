// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AegisVault.sol";
import "../src/AgentRegistry.sol";
import "../src/DecisionLog.sol";

contract AegisVaultTest is Test {
    AgentRegistry registry;
    DecisionLog decisionLog;
    AegisVault vault;

    address owner = address(0x1);
    address agent = address(0x2);
    address user = address(0x3);

    function setUp() public {
        vm.prank(owner);
        registry = new AgentRegistry();
        decisionLog = new DecisionLog();
        vault = new AegisVault(address(registry), address(decisionLog));
    }

    function testDepositETH() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        vault.deposit{value: 5 ether}();

        assertEq(vault.balances(user), 5 ether);
        assertEq(address(vault).balance, 5 ether);
    }

    function testWithdrawETH() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        vault.deposit{value: 5 ether}();

        vm.prank(user);
        vault.withdraw(2 ether);

        assertEq(vault.balances(user), 3 ether);
    }

    function testWithdrawExceedsBalance() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        vault.deposit{value: 5 ether}();

        vm.prank(user);
        vm.expectRevert("Insufficient balance");
        vault.withdraw(10 ether);
    }

    function testSetStrategy() public {
        bytes32 strategyHash = keccak256("conservative");
        vm.prank(user);
        vault.setStrategy(strategyHash);

        assertEq(vault.getStrategy(user), strategyHash);
    }

    function testExecuteByAgent() public {
        // Register agent
        vm.prank(owner);
        registry.registerAgent(agent, "Aegis Alpha", "QmTest123");

        // Deposit funds
        vm.deal(user, 10 ether);
        vm.prank(user);
        vault.deposit{value: 5 ether}();

        // Execute action
        vm.prank(agent);
        vault.executeByAgent(user, 1 ether, address(0), "");

        assertEq(vault.balances(user), 4 ether);
    }

    function testExecuteByUnauthorizedAgent() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        vault.deposit{value: 5 ether}();

        vm.prank(agent);
        vm.expectRevert("Unauthorized agent");
        vault.executeByAgent(user, 1 ether, address(0), "");
    }

    function testGetBalance() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        vault.deposit{value: 5 ether}();

        assertEq(vault.getBalance(user), 5 ether);
    }
}
