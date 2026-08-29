// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DecisionLog.sol";

contract DecisionLogTest is Test {
    DecisionLog decisionLog;

    function setUp() public {
        decisionLog = new DecisionLog();
    }

    function test_log_decision() public {
        bytes32 hash = keccak256("test-reasoning");
        uint256 id = decisionLog.logDecision(hash, "Increase ETH by 5%", 8500);
        
        assertEq(id, 0);
        assertEq(decisionLog.decisionCount(), 1);
        
        DecisionLog.Decision memory d = decisionLog.getDecision(id);
        assertEq(d.id, 0);
        assertEq(d.agent, address(this));
        assertEq(d.reasoningHash, hash);
        assertEq(d.confidence, 8500);
    }

    function test_mark_executed() public {
        uint256 id = decisionLog.logDecision(bytes32(0), "Test", 5000);
        decisionLog.markExecuted(id, keccak256("tx"));
        
        DecisionLog.Decision memory d = decisionLog.getDecision(id);
        assertTrue(d.executed);
        assertEq(d.txHash, keccak256("tx"));
    }

    function test_verify_decision() public {
        uint256 id = decisionLog.logDecision(bytes32(0), "Test", 5000);
        decisionLog.verifyDecision(id);
        
        DecisionLog.Decision memory d = decisionLog.getDecision(id);
        assertTrue(d.verified);
    }
}
