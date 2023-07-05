// import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// import { apiKey, apiUrl, contractABI, contractAddress, pKey } from "../utils/constants";
// import { ethers } from "ethers";

// const { ethereum } = window;


// const network = "sepolia";
// // Provider
// const alchemyProvider = new ethers.AlchemyProvider(network, apiKey);
// // Signer
// const signer = new ethers.Wallet(pKey, alchemyProvider);
// // Contract
// const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

// console.log(transactionContract)


// const web3 = createAlchemyWeb3(apiUrl);

// export const mainTransactionContract = new web3.eth.Contract(
//     contractABI,
//     contractAddress
// );


// // const config = {
// //     apiKey: apiKey,
// //     network: Network.ETH_SEPOLIA,
// // };

// // const alchemy = new Alchemy(config);


// // export const getAllMainTransactions = async () => {
// //     if (!ethereum) {
// //         // show toast notification
// //         return alert("Please install metamask!");
// //     }

// //     const accounts = await ethereum.request({
// //         method: 'eth_accounts'
// //     });

// //     if (accounts.length > 0) {
// //         const availableTransfers = await alchemy.core.getAssetTransfers({
// //             fromBlock: "0x0",
// //             fromAddress: accounts[0],
// //             category: ["external", "internal", "erc20", "erc721", "erc1155"],
// //         });

// //         const transactionCount = await alchemy.core.getTransactionCount(accounts[0]);

// //         return { availableTransfers, transactionCount };
// //     } else {
// //         console.log("No account found!");
// //     }
// // }


