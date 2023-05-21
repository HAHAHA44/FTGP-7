const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Betting", function () {
  let Betting;
  let betting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Betting = await ethers.getContractFactory("Betting");
    [owner, addr1, addr2] = await ethers.getSigners();
    console.log(owner, addr1, addr2);

    betting = await Betting.deploy(owner.address, 1, "Test Betting", 2, 86400);
    await betting.deployed();
  });

  it("should create an order and place a bet", async function () {
    // Create Order
    await betting.connect(owner).createOrder(owner.address, 1, 10,  { value: ethers.utils.parseUnits("100000", "gwei") });

    // Place Bet
    await betting.connect(owner).placeBet(owner.address, 1,  { value: ethers.utils.parseUnits("100", "gwei") });

    expect((await betting.currentOdd(0))).to.equal(0);
  });

  it("should settle bets", async function () {
    // Create Order
    await betting.connect(owner).createOrder(owner.address, 1, 2,  { value: ethers.utils.parseUnits("100", "gwei") });
    await betting.connect(owner).createOrder(owner.address, 0, 2,  { value: ethers.utils.parseUnits("100", "gwei") });

    // Place Bets
    await betting.connect(owner).placeBet(owner.address, 1,  { value: ethers.utils.parseUnits("100", "gwei") });
    await betting.connect(owner).placeBet(owner.address, 0,  { value: ethers.utils.parseUnits("100", "gwei") });

    // Settle Bets
    await betting.connect(owner).settle(1);

    const order1 = await betting.getMyBetsOrder(owner.address, 0);
    expect(order1[4]).to.be.eq(2);

    const bet1 = await betting.getMyBets(owner.address, 0);
    expect(bet1[4]).to.be.eq(1);
  });

});