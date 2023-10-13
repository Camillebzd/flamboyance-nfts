import { ethers, network, run } from "hardhat";

async function main() {
  console.log("Deploying...");
  const Flamboyant = await ethers.getContractFactory("Flamboyant");
  const flamboyant = await Flamboyant.deploy();
  console.log("Deployed!");
  console.log(`Flamboyant address: ${await flamboyant.getAddress()}`);
  console.log(`Transaction hash: ${flamboyant.deploymentTransaction()?.hash}`);

  if (network.config.chainId !== 31337 && network.config.chainId != undefined && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for blocks confirmations...");
    await flamboyant.deploymentTransaction()?.wait(6);
    console.log("Confirmed!");
    await verify(await flamboyant.getAddress(), []);
  }

}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
