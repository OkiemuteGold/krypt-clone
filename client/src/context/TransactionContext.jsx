import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

import PropTypes from "prop-types"

export const TransactionContext = React.createContext();

const { ethereum } = window;

// get ethereum contract
const createEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};


export const TransactionProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const localStorTransCount = localStorage.getItem("transactionCount");
    const [transactionCount, setTransactionCount] = useState(localStorTransCount ? localStorTransCount : 0);

    const [transactions, setTransactions] = useState([]);


    // handle form field change
    const handleChange = (e, name) => {
        setFormData(
            (prevState) => ({
                ...prevState,
                [name]: e.target.value
            })
        );
    };

    // get all available transactions
    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();

                console.log(availableTransactions);

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (Math.pow(10, 18))
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };


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

                // get all available transactions
                await getAllTransactions();
            } else {
                console.log("No account found!");
            }
        } catch (error) {
            console.error(error)
            throw new Error("No ethereum account found!");
        }
    };

    // check if transaction exists
    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
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
            window.location.reload();
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum account found!");
        }
    };

    // send transaction
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");

            // get data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = createEthereumContract();

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

            console.log(`Success... ${transactionHash?.hash}`);
            setIsLoading(false);

            const transCount = await transactionContract.getTransactionCount();
            setTransactionCount(transCount?.toNumber());

            localStorage.setItem("transactionCount", transCount?.toNumber());
            window.location.reload();
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum account found!");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = {
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
        transactions,
        transactionCount,
        isLoading
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
