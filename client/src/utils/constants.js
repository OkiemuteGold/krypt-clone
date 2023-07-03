// import { abi } from "./Transactions.json";
import { abi } from "../../../smart_contract/artifacts/contracts/Transactions.sol/Transactions.json";

console.log(abi)

export const contractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS
export const contractABI = abi;