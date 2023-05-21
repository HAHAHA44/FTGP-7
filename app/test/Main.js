// test/Main.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Main", function () {
  let mainContract;
  let bettingContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Main = await ethers.getContractFactory("Main");
    mainContract = await Main.deploy([ethers.constants.AddressZero]);
    await mainContract.deployed();
  });

  it("should create a guess theme", async function () {
    const topic = "Test Theme";
    const description = "This is a test theme";
    const bettingTime = 3600;
    const source = "Source";

    await mainContract.createGuessTheme(topic, description, bettingTime, source);

    const guessThemes = await mainContract.getGuessThemes(0, 10);
    const createdTheme = guessThemes[0][0];

    expect(createdTheme.ThemeNames).to.equal(topic);
    expect(createdTheme.Owners).to.equal(owner.address);
    expect(createdTheme.Descriptions).to.equal(description);
    expect(createdTheme.Sources).to.equal(source);
  });

  it("should create an order", async function () {
    const topic = "Test Theme";
    const description = "This is a test theme";
    const bettingTime = 3600;
    const source = "Source";

    await mainContract.createGuessTheme(topic, description, bettingTime, source);

    const guessThemes = await mainContract.getGuessThemes(0, 10);
    const createdTheme = guessThemes[0][0];

    const betSelected = 0;
    const optionSelected = 0;
    const oddSetted = 2;

    await mainContract.createOrder(betSelected, optionSelected, oddSetted, { value: ethers.utils.parseEther("1") });

    const bettingContractAddress = createdTheme.GuessThemes;
    const Betting = await ethers.getContractFactory("Betting");
    console.log(bettingContractAddress);
    bettingContract = Betting.attach(bettingContractAddress);

    const playerOrders = await mainContract.playerOrders(owner.address, 0);

    console.log(playerOrders);

    expect(playerOrders).to.equal(betSelected);
  });

  it("should place a bet", async function () {
    const topic = "Test Theme";
    const description = "This is a test theme";
    const bettingTime = 3600;
    const source = "Source";

    await mainContract.createGuessTheme(topic, description, bettingTime, source);

    const guessThemes = await mainContract.getGuessThemes(0, 10);
    const createdTheme = guessThemes[0][0];

    const betSelected = 0;
    const optionSelected = 0;
    const oddSetted = 2;

    await mainContract.createOrder(betSelected, optionSelected, oddSetted, { value: ethers.utils.parseUnits("4000", "gwei"), });

    await mainContract.placeBet(betSelected, optionSelected, { value: ethers.utils.parseUnits("100", "gwei") });

    const bettingContractAddress = createdTheme.GuessThemes;
    const Betting = await ethers.getContractFactory("Betting");
    console.log(bettingContractAddress);
    bettingContract = Betting.attach(bettingContractAddress);

    const playerBets = await mainContract.playerBets(owner.address, 0);

    expect(playerBets).to.equal(betSelected);
  });

  

});