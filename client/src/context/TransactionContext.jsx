import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { contractABI, contractAddress } from "../utils/constants";

import { ethers } from "ethers";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(
        provider,
        signer, transactionContract
    )
};

export const TransactionProvider = ({ children }) => {
    const value = "test";

    if (!value) {
        return
    }

    return (
        <TransactionContext.Provider value={value} >
            {children}
        </TransactionContext.Provider>
    )
};

TransactionProvider.propTypes = {
    children: PropTypes.any
}
