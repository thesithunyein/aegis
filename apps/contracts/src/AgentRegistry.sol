// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AgentRegistry
 * @notice Register and track AI agents on 0G Chain
 * @dev ERC-7857 compatible - agents are on-chain identities with metadata
 */
contract AgentRegistry {
    struct Agent {
        uint256 id;
        address owner;
        string name;
        string metadataURI; // 0G Storage hash for agent metadata
        uint256 createdAt;
        uint256 lastActiveAt;
        bool isActive;
        uint256 totalDecisions;
        uint256 successfulDecisions;
    }

    uint256 public agentCount;
    mapping(uint256 => Agent) public agents;
    mapping(address => uint256[]) public ownerAgents;
    mapping(address => Agent) public addressToAgent;

    event AgentRegistered(
        uint256 indexed id,
        address indexed owner,
        string name,
        string metadataURI
    );
    event AgentUpdated(uint256 indexed id, string metadataURI);
    event AgentDeactivated(uint256 indexed id);
    event DecisionRecorded(uint256 indexed id, bool success);

    /**
     * @notice Register a new AI agent
     */
    function registerAgent(
        string calldata name,
        string calldata metadataURI
    ) external returns (uint256 id) {
        require(addressToAgent[msg.sender].id == 0, "Already registered");

        id = agentCount++;
        agents[id] = Agent({
            id: id,
            owner: msg.sender,
            name: name,
            metadataURI: metadataURI,
            createdAt: block.timestamp,
            lastActiveAt: block.timestamp,
            isActive: true,
            totalDecisions: 0,
            successfulDecisions: 0
        });

        ownerAgents[msg.sender].push(id);
        addressToAgent[msg.sender] = agents[id];

        emit AgentRegistered(id, msg.sender, name, metadataURI);
    }

    /**
     * @notice Update agent metadata (new 0G Storage hash)
     */
    function updateAgent(
        uint256 id,
        string calldata metadataURI
    ) external {
        require(agents[id].owner == msg.sender, "Not owner");
        require(agents[id].isActive, "Agent inactive");

        agents[id].metadataURI = metadataURI;
        agents[id].lastActiveAt = block.timestamp;

        emit AgentUpdated(id, metadataURI);
    }

    /**
     * @notice Record a decision for an agent
     */
    function recordDecision(
        uint256 id,
        bool success
    ) external {
        require(agents[id].owner == msg.sender, "Not owner");

        agents[id].totalDecisions++;
        if (success) {
            agents[id].successfulDecisions++;
        }
        agents[id].lastActiveAt = block.timestamp;

        emit DecisionRecorded(id, success);
    }

    /**
     * @notice Deactivate an agent
     */
    function deactivateAgent(uint256 id) external {
        require(agents[id].owner == msg.sender, "Not owner");

        agents[id].isActive = false;

        emit AgentDeactivated(id);
    }

    /**
     * @notice Get agent details
     */
    function getAgent(
        uint256 id
    ) external view returns (Agent memory) {
        return agents[id];
    }

    /**
     * @notice Get all agents for an owner
     */
    function getOwnerAgents(
        address owner
    ) external view returns (uint256[] memory) {
        return ownerAgents[owner];
    }
}
