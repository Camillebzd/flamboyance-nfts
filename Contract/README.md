# Flamboyant NFTs

## Details

Contain the contract handling the ERC-721 NFTs. Tokens URI are generated during the "tokenURI" call by creating the JSON metadata on runtime. The image is a small svg. The only added networks are the local hardhat (by default in hardhat env) and Sepolia.

You can test it by running:

```shell
npx hardhat test
REPORT_GAS=true npx hardhat test
```

If you want to deploy it, remember to add a .env file with this:

```shell
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/<your-api-key>"
PRIVATE_KEY="<your-private-key>"
ETHERSCAN_API_KEY="<your-api-key>"
```

Then you can run:

```shell
npx hardhat run script/deploy.ts --network <network>
```

## Error during deployement

If the deployement script says "HardhatVerifyError: Invalid API Key" and you are sure your key is valid, then maybe the problem come from etherscan.

You can verify the contract manually by running:
```shell
npx hardhat verify --network <network> <address>
```

If you want to see my last one deployed on Sepolia:

**address:** 0xd768d1a86f90c0101C90829cfD58791164932318

**etherscan:** https://sepolia.etherscan.io/address/0xd768d1a86f90c0101C90829cfD58791164932318#code