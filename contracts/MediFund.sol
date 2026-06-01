// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MediFund
 * @notice Medical crowdfunding — receives ETH, emits events
 *         Deploy via thirdweb dashboard at https://thirdweb.com/explore
 */
contract MediFund {
    address public owner;
    uint256 public goalWei;
    uint256 public totalRaised;
    bool public active = true;

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    Donation[] public donations;

    event DonationReceived(address indexed donor, uint256 amount, string message, uint256 total);
    event FundsWithdrawn(address indexed to, uint256 amount);

    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    modifier isActive()  { require(active, "Campaign closed"); _; }

    constructor(uint256 _goalWei) {
        owner = msg.sender;
        goalWei = _goalWei;
    }

    function donate(string calldata message) external payable isActive {
        require(msg.value > 0, "Send ETH");
        totalRaised += msg.value;
        donations.push(Donation(msg.sender, msg.value, block.timestamp, message));
        emit DonationReceived(msg.sender, msg.value, message, totalRaised);
    }

    receive() external payable isActive {
        totalRaised += msg.value;
        donations.push(Donation(msg.sender, msg.value, block.timestamp, ""));
        emit DonationReceived(msg.sender, msg.value, "", totalRaised);
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Low balance");
        payable(owner).transfer(amount);
        emit FundsWithdrawn(owner, amount);
    }

    function getDonationCount() external view returns (uint256) { return donations.length; }
    function getBalance() external view returns (uint256) { return address(this).balance; }
    function remainingToGoal() external view returns (uint256) {
        return totalRaised >= goalWei ? 0 : goalWei - totalRaised;
    }
}
