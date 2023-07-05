### Krypt

My first blockchain cryptocurrency app that allows user send transactions in the blockchain

#### Smart Contract Dependencies

`npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers chai ethereum-waffle`

`npm install dotenv --save`

#### Dependencies needed to compile

`npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0" --legacy-peer-deps`

`npm install --save-dev "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-verify@^1.0.0" "@types/mocha@>=9.1.0" "@typechain/ethers-v6@^0.4.0" "@typechain/hardhat@^8.0.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.1" "ts-node@>=8.0.0" "typescript@>=4.5.0" --legacy-peer-deps`


#### Deploy smart contract

`https://docs.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet`

`https://docs.alchemy.com/docs/interacting-with-a-smart-contract`


`https://www.web3.university/tracks/create-a-smart-contract/integrate-your-smart-contract-with-a-frontend`

`https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html`

`https://docs.alchemy.com/docs/integrating-your-smart-contract-with-the-frontend`


`https://docs.alchemy.com/reference/sdk-gettransactioncount`

`https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum#steps-to-sending-your-transaction`

`https://docs.alchemy.com/reference/sdk-sendtransaction`

`https://docs.ethers.org/v5/api-keys/#api-keys--getDefaultProvider`


#### To Compile and Deploy

`npx hardhat compile`
`npx hardhat run scripts/deploy.js --network sepolia`


#### To verify on EtherScan

`npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS 'SAME_MESSAGE_USED_DURING_INITIAL_DEPLOYMENT'`