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

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const localStorTransCount = localStorage.getItem("transactionCount");
    const [transactionCount, setTransactionCount] = useState(localStorTransCount ? localStorTransCount : 0);

    // check if wallet is connected on page load
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                // show toast notification
                return alert("Please install metamask!");
            }

            const accounts = await ethereum.request({
                method: 'eth_accounts'
            });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);

                // get all transactions
            } else {
                console.log("No account found!");
            }
        } catch (error) {
            console.error(error)

            throw new Error("No ethereum account found!");
        }
    };

    // function to connect wallet on click
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);

            throw new Error("No ethereum account found!");
        }
    };

    // handle form field change
    const handleChange = (e, name) => {
        // console.log(e, name);
        setFormData({
            ...formData,
            [name]: e.target.value
        });
    };

    // send transaction
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");

            // get data from the form
            const { addressTo, amount, keyword, message } = formData;
            console.log({ addressTo, amount, keyword, message })

            const transactionContract = await getEthereumContract();

            // convert amount in ether to gwei
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 GWEI
                    value: parsedAmount._hex, // 0.00001 GWEI
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);

            setIsLoading(true);
            console.log(`Loading... ${transactionHash?.hash}`);

            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success... ${transactionHash?.hash}`);

            const transCount = await transactionContract.getTransactionCount();
            setTransactionCount(transCount?.toNumber());

            localStorage.setItem("transactionCount", transCount?.toNumber());

            if (!isLoading && transactionHash?.hash && transactionCount) {
                setFormData({
                    addressTo: "",
                    amount: "",
                    keyword: "",
                    message: ""
                });
            }
        } catch (error) {
            console.error(error);

            throw new Error("No ethereum account found!");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const value = {
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
    };

    return (
        <TransactionContext.Provider value={value} >
            {children}
        </TransactionContext.Provider>
    )
};

TransactionProvider.propTypes = {
    children: PropTypes.any
}
