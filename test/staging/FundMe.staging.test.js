const { assert } = require("chai");
const { network, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe Staging Tests", async function() {
      let deployer;
      let fundMe;
      const sendValue = ethers.utils.parseEther("0.05");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it("allows people to fund and withdraw", async function() {
        await fundMe.fund({ value: sendValue });
        const tx = await fundMe.withdraw({ gasLimit: 300000 });
        await tx.wait(1);
        const endingFundMeBalance = await ethers.provider.getBalance(
          fundMe.address
        );
        assert.equal(endingFundMeBalance.toString(), "0");
      });
    });
