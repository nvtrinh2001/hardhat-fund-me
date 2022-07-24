// SPDX-License-Identifier: MIT
// 1, Pragma
pragma solidity ^0.8.8;

// 2, Import
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

// 3, Error Codes
error FundMe__NotOwner();

// 4, Interfaces, Libraries, Contracts

// NatSpec Format
/** @title A contract for crowd funding
*   @author Trinh V. Nguyen
    @notice This contract is to demo a simple funding contract
    @dev This implements price feed as our library
*/
contract FundMe {
  // Type Declarations
  using PriceConverter for uint256;

  // State variables
  mapping(address => uint256) private s_addressToAmountFunded;
  address[] private s_funders;
  // Could we make this constant?  /* hint: no! We should make it immutable! */
  address private immutable i_owner;
  uint256 public constant MINIMUM_USD = 50 * 10**18;
  AggregatorV3Interface private s_priceFeed;

  // Modifier
  modifier onlyOwner() {
    // require(msg.sender == owner);
    if (msg.sender != i_owner) revert FundMe__NotOwner();
    _;
  }

  // Functions
  // constructor
  constructor(address priceFeedAddress) {
    i_owner = msg.sender;
    s_priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  // receive
  receive() external payable {
    fund();
  }

  // fallback
  fallback() external payable {
    fund();
  }

  // external
  // public
  /** @notice This function funds this contract
   *   @dev This implements price feed as our library
   */
  function fund() public payable {
    require(
      msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
      "You need to spend more ETH!"
    );
    // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
    s_addressToAmountFunded[msg.sender] += msg.value;
    s_funders.push(msg.sender);
  }

  /** @notice This function withdraws money from contract
   *   @dev This implements price feed as our library
   */
  function withdraw() public payable onlyOwner {
    for (
      uint256 funderIndex = 0;
      funderIndex < s_funders.length;
      funderIndex++
    ) {
      address funder = s_funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }
    s_funders = new address[](0);
    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    require(callSuccess, "Call failed");
  }

  function cheaperWithdraw() public payable onlyOwner {
    address[] memory funders = s_funders;
    // mappings can't be in memory
    for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
      address funder = funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }
    s_funders = new address[](0);
    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    require(callSuccess, "Call failed");
  }

  // internal

  // private

  // view/pure
  function getOwner() public view returns (address) {
    return i_owner;
  }

  function getFunders(uint256 index) public view returns (address) {
    return s_funders[index];
  }

  function getAddressToAmountFunded(address funder)
    public
    view
    returns (uint256)
  {
    return s_addressToAmountFunded[funder];
  }

  function getPriceFeed() public view returns (AggregatorV3Interface) {
    return s_priceFeed;
  }
}

// Add s_ where the variables are stored in storage
