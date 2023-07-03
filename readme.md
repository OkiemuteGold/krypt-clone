### Krypt

My first blockchain cryptocurrency app that allows user send transactions in the blockchain

#### Smart Contract Dependencies

`npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers chai ethereum-waffle`

`npm install dotenv --save`

#### Dependencies needed to compile

`npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0" --legacy-peer-deps`

`npm install --save-dev "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-verify@^1.0.0" "@types/mocha@>=9.1.0" "@typechain/ethers-v6@^0.4.0" "@typechain/hardhat@^8.0.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.1" "ts-node@>=8.0.0" "typescript@>=4.5.0" --legacy-peer-deps`


#### Compile and Deploy smart contract

`https://docs.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet`

`npx hardhat compile`
`npx hardhat run scripts/deploy.js --network sepolia`