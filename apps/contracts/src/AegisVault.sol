// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title AegisVault
 * @notice User vault that holds funds and enforces agent permissions
 * @dev Each user deploys one vault. The agent proposes actions, user approves.
 */
contract AegisVault is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct AgentConfig {
        address agentAddress;
        uint256 maxPositionPercent; // Basis points (100 = 1%)
        uint256 maxTradeSize; // In wei
        bool isActive;
    }

    struct PendingAction {
        address target;
        uint256 value;
        bytes data;
        uint256 timestamp;
        bool executed;
    }

    address public owner;
    AgentConfig public agent;
    PendingAction[] public pendingActions;

    uint256 public totalDeposits;
    uint256 public totalWithdrawals;

    event VaultCreated(address indexed owner, address indexed vault);
    event AgentConfigured(address indexed agent, uint256 maxPosition, uint256 maxTradeSize);
    event ActionProposed(uint256 indexed actionId, address target, uint256 value);
    event ActionExecuted(uint256 indexed actionId, bool success);
    event ActionRejected(uint256 indexed actionId);
    event Deposited(address indexed token, uint256 amount);
    event Withdrawn(address indexed token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyAgent() {
        require(msg.sender == agent.agentAddress, "Not agent");
        require(agent.isActive, "Agent not active");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit VaultCreated(msg.sender, address(this));
    }

    /**
     * @notice Configure the AI agent that can propose actions
     */
    function configureAgent(
        address _agentAddress,
        uint256 _maxPositionPercent,
        uint256 _maxTradeSize
    ) external onlyOwner {
        require(_agentAddress != address(0), "Invalid agent address");
        require(_maxPositionPercent <= 2500, "Max position too high"); // 25%

        agent = AgentConfig({
            agentAddress: _agentAddress,
            maxPositionPercent: _maxPositionPercent,
            maxTradeSize: _maxTradeSize,
            isActive: true
        });

        emit AgentConfigured(_agentAddress, _maxPositionPercent, _maxTradeSize);
    }

    /**
     * @notice Agent proposes an action for owner approval
     */
    function proposeAction(
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyAgent returns (uint256 actionId) {
        // Validate action is within limits
        if (value > 0) {
            require(value <= agent.maxTradeSize, "Exceeds max trade size");
        }

        actionId = pendingActions.length;
        pendingActions.push(PendingAction({
            target: target,
            value: value,
            data: data,
            timestamp: block.timestamp,
            executed: false
        }));

        emit ActionProposed(actionId, target, value);
    }

    /**
     * @notice Owner approves and executes a proposed action
     */
    function approveAndExecute(uint256 actionId) external onlyOwner nonReentrant {
        require(actionId < pendingActions.length, "Invalid action");
        PendingAction storage action = pendingActions[actionId];
        require(!action.executed, "Already executed");
        require(block.timestamp - action.timestamp < 1 hours, "Action expired");

        action.executed = true;

        bytes memory callData = action.data;
        (bool success, ) = action.target.call{value: action.value}(callData);

        emit ActionExecuted(actionId, success);
        require(success, "Action failed");
    }

    /**
     * @notice Owner rejects a proposed action
     */
    function rejectAction(uint256 actionId) external onlyOwner {
        require(actionId < pendingActions.length, "Invalid action");
        PendingAction storage action = pendingActions[actionId];
        require(!action.executed, "Already executed");

        emit ActionRejected(actionId);
    }

    /**
     * @notice Deposit ETH into vault
     */
    function depositETH() external payable {
        totalDeposits += msg.value;
        emit Deposited(address(0), msg.value);
    }

    /**
     * @notice Withdraw ETH from vault
     */
    function withdrawETH(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        totalWithdrawals += amount;

        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "Withdraw failed");

        emit Withdrawn(address(0), amount);
    }

    /**
     * @notice Deposit ERC20 token into vault
     */
    function depositToken(address token, uint256 amount) external {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        emit Deposited(token, amount);
    }

    /**
     * @notice Withdraw ERC20 token from vault
     */
    function withdrawToken(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner, amount);
        emit Withdrawn(token, amount);
    }

    /**
     * @notice Deactivate agent
     */
    function deactivateAgent() external onlyOwner {
        agent.isActive = false;
    }

    /**
     * @notice Get vault balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Get pending actions count
     */
    function getPendingActionsCount() external view returns (uint256) {
        return pendingActions.length;
    }

    // Allow receiving ETH
    receive() external payable {}
}
