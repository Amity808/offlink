// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/ECDSA.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract OffLink is AccessControl {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");
    bytes32 public constant BUYER_ROLE = keccak256("BUYER_ROLE");

    using ECDSA for bytes32;

    uint256 public orderCounter;

    address _feeCollectorAddress;
    uint256 _feeDecimal = 10000;


    struct TokenConfig {
        bool status;
        uint256 fee;
        uint256 minOrder;
        uint256 maxOrder;
    }

     struct CurrencyConfig {
        bool status;
        uint256 fee;
        uint256 minOrder;
        uint256 maxOrder;
    }

    mapping(address => TokenConfig) private _allowedTokens;
    mapping(bytes32 => CurrencyConfig) private _allowedCurrencies;

    struct Order {
        address seller;
        address buyer;
        address token;
        bytes32 currency;
        uint256 amountInToken;
        uint256 amountInCurrency;
        bool locked;
    }

    mapping(uint256 => Order) public orders;

    event SellOrderPlaced(
        uint256 indexed orderId,
        address seller,
        address token,
        bytes32 currency,
        uint256 amountInToken,
        uint256 amountInCurrency
    );

    event OrderAccepted(uint256 indexed orderId, address buyer);

    event FundsReleased(uint256 indexed orderId, address receiver, uint256 amount);

    event OrderCancelled(uint256 indexed orderId, address seller, uint256 amount);

    constructor(address feeCollectorAddress) {
        _setRoleAdmin(BUYER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _feeCollectorAddress = feeCollectorAddress;
    }

    modifier onlyManager() {
        require(hasRole(MANAGER_ROLE, msg.sender), "Only manager can call this function");
        _;
    }

    modifier onlyBuyer() {
        require(hasRole(BUYER_ROLE, msg.sender), "Only buyer can call this function");
        _;
    }

     modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Only admin can call this function");
        _;
    }

    modifier onlySeller(uint256 orderID) {
        require(orders[orderID].seller == msg.sender, "Only order seller can call this function");
        _;
    }

    function placeSellOrder(
        uint256 amountInToken,
        uint256 amountInCurrency,
        bytes32 currency,
        address token,
        bytes memory signature
    ) external {
        require(_allowedTokens[token].status, "Invalid token");
        require(amountInToken > _allowedTokens[token].minOrder && amountInToken < _allowedTokens[token].maxOrder, "Invalid token amount");

        require(_allowedCurrencies[currency].status, "Invalid currency");
        require(amountInCurrency > _allowedCurrencies[currency].minOrder && amountInCurrency < _allowedCurrencies[currency].maxOrder, "Invalid currency amount");

        require(verifySignerSignature(amountInToken, amountInCurrency, currency, token, signature), "Invalid signature");
        require(IERC20(token).transferFrom(msg.sender, address(this), amountInToken), "Token transfer failed");

        Order storage order = orders[orderCounter];
        order.seller = msg.sender;
        order.token = token;
        order.currency = currency;
        order.amountInToken = amountInToken;
        order.amountInCurrency = amountInCurrency;
        order.locked = false;

        emit SellOrderPlaced(orderCounter, msg.sender, token, currency, amountInToken, amountInCurrency);

        orderCounter++;
    }

    function acceptOrder(uint256 orderId) external onlyRole(BUYER_ROLE) {
        Order storage order = orders[orderId];
        require(!order.locked, "Order already accepted");
        order.buyer = msg.sender;
        order.locked = true;

        emit OrderAccepted(orderId, msg.sender);
    }

    function releaseFunds(uint256 orderId) external onlySeller(orderId) {
        Order storage order = orders[orderId];
        require(order.locked, "Order not locked");
        require(IERC20(order.token).transfer(order.buyer, order.amountInToken), "Token transfer to buyer failed");
        
        uint256 adminFee = order.amountInToken * _allowedTokens[order.token].fee / _feeDecimal;
        require(IERC20(order.token).transfer(_feeCollectorAddress, adminFee), "Fee transfer failed");

        emit FundsReleased(orderId, order.seller, order.amountInToken);

        order.locked = false;
    }

    function adminReleaseFunds(uint256 orderId) external onlyManager {
        Order storage order = orders[orderId];
        require(order.locked, "Order not locked");
        require(IERC20(order.token).transfer(order.buyer, order.amountInToken), "Token refund to buyer failed");

        uint256 adminFee = order.amountInToken * _allowedTokens[order.token].fee / _feeDecimal;
        require(IERC20(order.token).transfer(_feeCollectorAddress, adminFee), "Fee transfer failed");

        emit FundsReleased(orderId, order.buyer, order.amountInToken);

        order.locked = false;
    }

    function adminRefundFunds(uint256 orderId) external onlyManager {
        Order storage order = orders[orderId];
        require(order.locked, "Order not locked");
        emit FundsReleased(orderId, order.seller, order.amountInToken); // Refund without transferring tokens
        order.locked = false;
    }


    function cancelOrder(uint256 orderId) external onlySeller(orderId) {
        Order storage order = orders[orderId];
        require(!order.locked, "Order is locked");
        require(IERC20(order.token).transfer(order.seller, order.amountInToken), "Token refund to buyer failed");

        delete orders[orderId];
        emit OrderCancelled(orderId, order.seller, order.amountInToken); // Refund without transferring tokens
    }

    function cancelOrderAdmin(uint256 orderId) external onlyManager {
        Order storage order = orders[orderId];
        require(!order.locked, "Order is locked");
        require(IERC20(order.token).transfer(order.seller, order.amountInToken), "Token refund to buyer failed");

        delete orders[orderId];
        emit OrderCancelled(orderId, order.seller, order.amountInToken); // Refund without transferring tokens
    }

    function verifySignerSignature(
        uint256 amountInToken,
        uint256 amountInCurrency,
        bytes32 currency,
        address token,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                amountInToken,
                amountInCurrency,
                currency,
                token,
                address(this),
                block.chainid
            )
        );

        address signer = ECDSA.recover(messageHash, signature);

        return hasRole(MANAGER_ROLE, signer);
    }

    function addToken(
        address token,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyManager {
        require(!_allowedTokens[token].status, "Token already exists");
        _allowedTokens[token] = TokenConfig(true, fee, minOrder, maxOrder);
    }

    function editToken(
        address token,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyAdmin {
        require(_allowedTokens[token].status, "Token does not exist");
        _allowedTokens[token] = TokenConfig(true, fee, minOrder, maxOrder);
    }

    function removeToken(address token) external onlyAdmin {
        require(_allowedTokens[token].status, "Token does not exist");
        delete _allowedTokens[token];
    }

    function addCurrency(
        bytes32 currency,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyAdmin {
        require(!_allowedCurrencies[currency].status, "Currency already exists");
        _allowedCurrencies[currency] = CurrencyConfig(true, fee, minOrder, maxOrder);
    }

    function editCurrency(
        bytes32 currency,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyAdmin {
        require(_allowedCurrencies[currency].status, "Currency does not exist");
        _allowedCurrencies[currency] = CurrencyConfig(true, fee, minOrder, maxOrder);
    }

    function removeCurrency(bytes32 currency) external onlyAdmin {
        require(_allowedCurrencies[currency].status, "Currency does not exist");
        delete _allowedCurrencies[currency];
    }
}
