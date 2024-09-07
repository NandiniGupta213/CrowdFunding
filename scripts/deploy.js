const hre = require("hardhat");

async function main() {
    // Match the contract name exactly as it is in the Solidity code
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdfunding = await CrowdFunding.deploy();

    // Wait for the contract to be deployed
    await crowdfunding.deployed();

    console.log(`CrowdFunding deployed to ${crowdfunding.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
