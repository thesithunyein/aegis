// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AgentID
 * @notice ERC-7857 compatible Agent Identity on 0G Chain
 * @dev Each AI agent gets a portable, on-chain identity that follows it across dApps
 * 
 * ERC-7857 defines a standard for AI agent identity:
 * - Agents have a unique on-chain ID
 * - Agents have metadata (name, model, capabilities)
 * - Agents can be verified (TEE attestation)
 * - Agents have an owner who controls them
 */
contract AgentID {
    struct AgentIdentity {
        uint256 id;
        address owner;
        string name;
        string model;           // AI model used (e.g., "0gm-1.0-35b-a3b")
        string metadataURI;     // 0G Storage hash for full metadata
        bytes32 teeAttestation; // TEE attestation hash (proof of genuine inference)
        uint256 createdAt;
        uint256 lastActiveAt;
        uint256 totalInferences;
        bool isActive;
        bool isVerified;        // TEE-verified agent
    }

    uint256 public agentCount;
    mapping(uint256 => AgentIdentity) public agents;
    mapping(address => uint256) public ownerAgentId;     // One agent per address
    mapping(uint256 => bytes32[]) public inferenceProofs; // TEE receipts per agent

    // Events
    event AgentCreated(uint256 indexed id, address indexed owner, string name, string model);
    event AgentUpdated(uint256 indexed id, string metadataURI);
    event AgentVerified(uint256 indexed id, bytes32 teeAttestation);
    event InferenceRecorded(uint256 indexed agentId, bytes32 proofHash, uint256 timestamp);

    /**
     * @notice Create a new agent identity
     */
    function createAgent(
        string calldata name,
        string calldata model,
        string calldata metadataURI,
        bytes32 teeAttestation
    ) external returns (uint256 id) {
        require(ownerAgentId[msg.sender] == 0, "Already have an agent");

        id = agentCount++;
        agents[id] = AgentIdentity({
            id: id,
            owner: msg.sender,
            name: name,
            model: model,
            metadataURI: metadataURI,
            teeAttestation: teeAttestation,
            createdAt: block.timestamp,
            lastActiveAt: block.timestamp,
            totalInferences: 0,
            isActive: true,
            isVerified: teeAttestation != bytes32(0)
        });

        ownerAgentId[msg.sender] = id;

        emit AgentCreated(id, msg.sender, name, model);
        if (teeAttestation != bytes32(0)) {
            emit AgentVerified(id, teeAttestation);
        }
    }

    /**
     * @notice Record an inference with TEE proof
     */
    function recordInference(
        uint256 agentId,
        bytes32 proofHash
    ) external {
        require(agents[agentId].owner == msg.sender, "Not owner");
        require(agents[agentId].isActive, "Agent inactive");

        agents[agentId].totalInferences++;
        agents[agentId].lastActiveAt = block.timestamp;

        inferenceProofs[agentId].push(proofHash);

        emit InferenceRecorded(agentId, proofHash, block.timestamp);
    }

    /**
     * @notice Update agent metadata (new 0G Storage hash)
     */
    function updateAgent(uint256 id, string calldata metadataURI) external {
        require(agents[id].owner == msg.sender, "Not owner");
        require(agents[id].isActive, "Agent inactive");

        agents[id].metadataURI = metadataURI;
        agents[id].lastActiveAt = block.timestamp;

        emit AgentUpdated(id, metadataURI);
    }

    /**
     * @notice Verify agent with TEE attestation
     */
    function verifyAgent(uint256 id, bytes32 teeAttestation) external {
        require(agents[id].owner == msg.sender, "Not owner");

        agents[id].teeAttestation = teeAttestation;
        agents[id].isVerified = true;

        emit AgentVerified(id, teeAttestation);
    }

    /**
     * @notice Deactivate agent
     */
    function deactivateAgent(uint256 id) external {
        require(agents[id].owner == msg.sender, "Not owner");
        agents[id].isActive = false;
    }

    /**
     * @notice Get agent identity
     */
    function getAgent(uint256 id) external view returns (AgentIdentity memory) {
        return agents[id];
    }

    /**
     * @notice Get agent by owner address
     */
    function getAgentByOwner(address owner) external view returns (uint256) {
        return ownerAgentId[owner];
    }

    /**
     * @notice Get inference proofs for an agent
     */
    function getInferenceProofs(uint256 agentId) external view returns (bytes32[] memory) {
        return inferenceProofs[agentId];
    }
}
