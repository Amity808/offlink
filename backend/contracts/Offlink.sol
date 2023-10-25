// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Offlink {
    address payable offlinkAddress;
    uint256 exchangeCount;
    uint256 customerCount;

    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Customer {
        address customer;
        address payable exchanger;
        uint256 amount;
        bool sent; // Stable coin deposit
        bool isPaid;
        bool transactionComplete;
        bool transactionPending;
        uint256 exchangeTimestamp;
    }

    // Declare events
    event CustomerDeposited(address indexed customer, uint256 amount);
    event CurrencyExchanged(
        uint256 indexed customerIndex,
        address exchangerm,
        uint256 exchangeTimestamp
    );
    event PaymentApproved(
        uint256 indexed customerIndex,
        address indexed approver,
        uint256 conversion
    );

    mapping(uint256 => Customer) public customers;

    constructor() {
        offlinkAddress = payable(msg.sender);
    }

    modifier offlinkAdmin() {
        require(msg.sender == offlinkAddress, "Must be offlink address");
        _;
    }

    // deposit currency you want to exchange
    function customerDeposit(uint256 amount) public {
        require(
            IERC20(cUsdTokenAddress).transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            "Transfer failed. Make sure to approve the transfer first"
        );

        Customer storage customer = customers[customerCount++];
        customer.customer = msg.sender;
        customer.amount = amount;
        customer.sent = true;
        customer.isPaid = false;

        emit CustomerDeposited(msg.sender, amount);
    }

    // to exchange the currency
    function exchangeCurrency(uint256 customerIndex) public {
        Customer storage customer = customers[customerIndex];

        require(!customer.transactionComplete, "Exchange already completed");
        require(customer.sent, "Customer must have deposited");

        customer.exchanger = payable(msg.sender);
        customer.transactionPending = true;
        customer.exchangeTimestamp = block.timestamp;
        emit CurrencyExchanged(
            customerIndex,
            msg.sender,
            customer.exchangeTimestamp
        );
    }

    // to approve payment
    function approvePayment(uint256 customerIndex) public {
        Customer storage customer = customers[customerIndex];
        require(customer.sent, "Customer must have deposited");

        uint256 conversion = (customer.amount * 15) / 100;
        require(
            IERC20(cUsdTokenAddress).transfer(msg.sender, conversion),
            "Tranfer failed"
        );
        customer.isPaid = true;
        customer.transactionComplete = true;

        // Emit the PaymentApproved event
        emit PaymentApproved(customerIndex, msg.sender, conversion);
    }

    // for Admin to withdraw
    function adminWithdraw(uint256 amount) public offlinkAdmin {
        IERC20(cUsdTokenAddress).transfer(msg.sender, amount);
    }
}
