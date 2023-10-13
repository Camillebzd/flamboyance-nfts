import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { EventLog } from "ethers";

describe("Flamboyant", function () {
  async function deployFixture() {
    const [ deployer ] = await ethers.getSigners();
    const Flamboyant = await ethers.getContractFactory("Flamboyant");
    const flamboyant = await Flamboyant.deploy();

    return { deployer, flamboyant };
  }

  it("Should mint an nft", async function () {
    const { deployer, flamboyant } = await loadFixture(deployFixture);

    const tx = await flamboyant.safeMint("Username");
    const rc = await tx.wait();
    const transferEvent = (rc?.logs as EventLog[]).find(log => log.fragment.name == "Transfer");
    expect(transferEvent).to.not.equal(undefined);
    const tokenId = Number(transferEvent?.args[2]);
    expect(await flamboyant.ownerOf(tokenId)).to.equal(deployer.address);
  });

  it("Should set the userName after mint", async function () {
    const { flamboyant } = await loadFixture(deployFixture);

    const userName = "test123"
    const tx = await flamboyant.safeMint(userName);
    const rc = await tx.wait();
    const transferEvent = (rc?.logs as EventLog[]).find(log => log.fragment.name == "Transfer");
    expect(transferEvent).to.not.equal(undefined);
    const tokenId = Number(transferEvent?.args[2]);
    expect(await flamboyant.tokenIdToUsername(tokenId)).to.equal(userName);
  });
});