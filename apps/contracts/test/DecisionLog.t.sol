// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DecisionLog.sol";

contract DecisionLogTest is DecisionLog {
    // Expose internal state for testing
    function getDecisionCount() external view returns (uint256) {
        return decisionCount;
    }
}

contract DecisionLogTestRunner is Test {
    DecisionLogTest log;

    address agent = address(0x1);
    address user = address(0x2);

    function setUp() public {
        log = new DecisionLogTest();
    }

    function testLogDecision() public {
        bytes32 decisionHash = keccak256("test-decision");
        bytes32 storageHash = keccak256("storage-proof");

        uint256 id = log.logDecision(
            agent,
            user,
            decisionHash,
            storageHash,
            85, // confidence
            30  // riskScore
        );

        assertEq(id, 1);
        assertEq(log.getDecisionCount(), 1);
    }

    function testGetDecision() public {
        bytes32 decisionHash = keccak256("test-decision");
        bytes32 storageHash = keccak256("storage-proof");

        log.logDecision(agent, user, decisionHash, storageHash, 85, 30);

        (address storedAgent, address storedUser, bytes32 storedHash, , uint256 confidence, uint256 riskScore) = log.getDecision(1);

        assertEq(storedAgent, agent);
        assertEq(storedUser, user);
        assertEq(storedHash, decisionHash);
        assertEq(confidence, 85);
        assertEq(riskScore, 30);
    }

    function testVerifyDecision() public {
        bytes32 decisionHash = keccak256("test-decision");
        bytes32 storageHash = keccak256("storage-proof");

        log.logDecision(agent, user, decisionHash, storageHash, 85, 30);

        assertTrue(log.verifyDecision(1, decisionHash, storageHash));
        assertFalse(log.verifyDecision(1, keccak256("wrong"), storageHash));
    }

    function testExecuteDecision() public {
        bytes32 decisionHash = keccak256("test-decision");
        bytes32 storageHash = keccak256("storage-proof");

        log.logDecision(agent, user, decisionHash, storageHash, 85, 30);

        bytes32 txHash = keccak256("tx-0x123");
        log.executeDecision(1, txHash);

        (, , , bytes32 storedTxHash, , ) = log.getDecision(1);
        assertEq(storedTxHash, txHash);
    }
}
