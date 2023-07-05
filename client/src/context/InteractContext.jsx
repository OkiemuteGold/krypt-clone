import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { contractABI, contractAddress, apiUrl } from "../utils/constants";
// import { mainTransactionContract } from "./IntegrateFrontend";

import { Utils } from "alchemy-sdk"
import { createAlchemyWeb3 } from "@alch/alchemy-web3";


export const TransactionContext = React.createContext();

const { ethereum } = window;

const web3 = createAlchemyWeb3(apiUrl);

const mainTransactionContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);


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

    const getTransactionCount = async () => {
        const transactionCount = await mainTransactionContract.methods.getTransactionCount().call();

        console.log(transactionCount);

        setTransactionCount(transactionCount);
        localStorage.setItem("transactionCount", transactionCount);
    };

    // get all available transactions
    const getAllTransactions = async () => {
        try {
            if (ethereum) {

                const availableTransactions = await mainTransactionContract.methods.getAllTransactions().call();

                // console.log(availableTransactions && availableTransactions);

                const structuredTransactions = availableTransactions?.map((transaction) => ({
                    addressFrom: transaction.sender,
                    addressTo: transaction.receiver,
                    amount: parseInt(transaction.amount) / (10 ** 18),
                    keyword: transaction.keyword,
                    message: transaction.message,
                    timestamp: new Date(transaction.timestamp * 1000).toLocaleString()
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.error(error);
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

    // listens for state changes in the Metamask wallet - new account, switch, disconnect
    const addWalletListener = () => {
        if (!ethereum) return alert("Please install metamask!");

        ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                setCurrentAccount("");
            }
        });
    }

    // check if transaction exists
    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                await getTransactionCount();
            }
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object");
        }
    };

    // send transaction
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");

            // get data from the form
            const { addressTo, amount, keyword, message } = formData;

            // convert amount in ether to gwei
            const parsedAmount = Utils.parseEther(amount);

            console.log(parsedAmount)

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 GWEI
                    value: parsedAmount._hex // 0.00001 GWEI
                }]
            });

            setIsLoading(true);

            await mainTransactionContract.methods.addToBlockchain(addressTo, parsedAmount, keyword, message).send({
                from: currentAccount
            },
                (error, transactionHash) => {
                    console.log(`Loading - ${transactionHash}`);

                    if (transactionHash) {
                        console.log(`Success - ${transactionHash}`);
                        setIsLoading(false);

                        return transactionHash;
                    } else if (error) {
                        console.error(error)
                        setIsLoading(false);
                    }
                }
            ).on("receipt", async () => {
                // console.log(receipt);

                await getTransactionCount();
                window.location.reload();
            });

        } catch (error) {
            console.error(error);
            throw new Error("No ethereum account found!");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
        addWalletListener();
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
