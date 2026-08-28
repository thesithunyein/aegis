// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title DecisionLog
 * @notice Immutable audit trail for agent decisions
 * @dev Every decision is logged with reasoning hash, action, and verification status
 */
contract DecisionLog {
    struct Decision {
        uint256 id;
        address agent;
        uint256 timestamp;
        bytes32 reasoningHash; // 0G Storage hash of full reasoning
        string action;
        uint256 confidence; // Basis points (10000 = 100%)
        bool executed;
        bytes32 txHash;
        bool verified; // TEE attestation verified
    }

    uint256 public decisionCount;
    mapping(uint256 => Decision) public decisions;
    mapping(address => uint256[]) public agentDecisions;

    event DecisionLogged(
        uint256 indexed id,
        address indexed agent,
        bytes32 reasoningHash,
        string action,
        uint256 confidence
    );

    event DecisionVerified(uint256 indexed id, bytes32 txHash);
    event DecisionExecuted(uint256 indexed id);

    /**
     * @notice Log a new agent decision
     */
    function logDecision(
        bytes32 reasoningHash,
        string calldata action,
        uint256 confidence
    ) external returns (uint256 id) {
        id = decisionCount++;
        decisions[id] = Decision({
            id: id,
            agent: msg.sender,
            timestamp: block.timestamp,
            reasoningHash: reasoningHash,
            action: action,
            confidence: confidence,
            executed: false,
            txHash: bytes32(0),
            verified: false
        });

        agentDecisions[msg.sender].push(id);

        emit DecisionLogged(id, msg.sender, reasoningHash, action, confidence);
    }

    /**
     * @notice Mark decision as executed with tx hash
     */
    function markExecuted(uint256 id, bytes32 txHash) external {
        Decision storage decision = decisions[id];
        require(decision.agent == msg.sender, "Not agent");
        require(!decision.executed, "Already executed");

        decision.executed = true;
        decision.txHash = txHash;

        emit DecisionExecuted(id);
    }

    /**
     * @notice Verify decision with TEE attestation
     */
    function verifyDecision(uint256 id) external {
        Decision storage decision = decisions[id];
        require(!decision.verified, "Already verified");

        decision.verified = true;

        emit DecisionVerified(id, decision.txHash);
    }

    /**
     * @notice Get all decisions for an agent
     */
    function getAgentDecisions(
        address agent
    ) external view returns (uint256[] memory) {
        return agentDecisions[agent];
    }

    /**
     * @notice Get decision details
     */
    function getDecision(
        uint256 id
    ) external view returns (Decision memory) {
        return decisions[id];
    }
}
