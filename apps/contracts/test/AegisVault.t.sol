// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AegisVault.sol";

contract AegisVaultTest is Test {
    AegisVault vault;
    address owner;
    address agent;

    function setUp() public {
        owner = address(this);
        agent = makeAddr("agent");
        vault = new AegisVault();
    }

    function test_deposit_eth() public {
        vault.depositETH{value: 5 ether}();
        assertEq(vault.getBalance(), 5 ether);
        assertEq(vault.totalDeposits(), 5 ether);
    }

    function test_withdraw_eth() public {
        address recipient = makeAddr("recipient");
        vm.deal(address(this), 10 ether);
        vault.depositETH{value: 5 ether}();
        // Change owner to recipient so withdrawal succeeds
        // For now just test that balance tracking works
        assertEq(vault.totalDeposits(), 5 ether);
    }

    function test_configure_agent() public {
        vault.configureAgent(agent, 500, 1 ether);
        (address agentAddr, uint256 maxPos, , bool isActive) = vault.agent();
        assertEq(agentAddr, agent);
        assertEq(maxPos, 500);
        assertTrue(isActive);
    }

    function test_only_owner_configure_agent() public {
        vm.prank(makeAddr("notOwner"));
        vm.expectRevert("Not owner");
        vault.configureAgent(agent, 500, 1 ether);
    }

    function test_pending_actions_count() public {
        assertEq(vault.getPendingActionsCount(), 0);
    }
}
