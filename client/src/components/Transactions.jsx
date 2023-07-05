import { useContext } from "react";
import { TransactionContext } from "../context/InteractContext";

import useFetch from "../hooks/useFetch";
// import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import PropTypes from "prop-types"

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount }) => {
    const gifUrl = useFetch({ keyword });

    const dummyUrl = "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";

    return (
        <div
            className="bg-[#181918] mb-3 flex flex-1
            xlf:min-w-[400px]
            xlf:max-w-[500px]
            2xl:min-w-[350px]
            2xl:max-w-[400px]
            sm:min-w-[280px]
            sm:max-w-[300px]
            min-w-full
            flex-col pt-4 pb-3 px-4 rounded-md hover:shadow-2xl"
        >
            <div className="flex flex-col justify-center items-center w-full py-2">
                <div className="flex flex-col gap-1 w-full mb-6 pb-2 px-3">
                    <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base"><span className="text-gray-300 text-sm mr-1">From:</span> {shortenAddress(addressFrom)}</p>
                    </a>

                    <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base"><span className="text-gray-300 text-sm mr-1">To:</span> {shortenAddress(addressTo)}</p>
                    </a>

                    <p className="text-white text-base"><span className="text-gray-300 text-sm mr-1">Amount:</span> {amount} ETH</p>

                    {message && (
                        <p className="text-white text-base mt-4">Message: {message}</p>
                    )}
                </div>

                <img
                    src={gifUrl.url || dummyUrl}
                    alt={gifUrl.title}
                    className="w-full h-60 2xl:h-[350px] rounded-md shadow-lg object-cover"
                />

                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-semibold">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

TransactionsCard.propTypes = {
    addressTo: PropTypes.string,
    addressFrom: PropTypes.string,
    timestamp: PropTypes.string,
    message: PropTypes.string,
    keyword: PropTypes.string,
    amount: PropTypes.number,
    // url: PropTypes.string
}

const Transactions = () => {
    const { transactions, currentAccount } = useContext(TransactionContext);
    console.log(transactions && transactions);

    return (
        <div className="w-full gradient-bg-transactions">
            <div className="max_width_2000 flex justify-center items-center 2xl:px-20">

                {/* <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions"> */}

                <div className="flex flex-col md:p-12 py-12 px-2">
                    {currentAccount ? (
                        <h3 className="text-white text-3xl text-center my-2">
                            Latest Transactions
                        </h3>
                    ) : (
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect your account to see the latest transactions
                        </h3>
                    )}

                    <div className="flex gap-7 xl:gap-8 flex-wrap justify-center items-center mt-14">
                        {/* [...dummyData, ...transactions] */}
                        {transactions?.reverse().map((transaction, i) => (
                            <TransactionsCard key={i} {...transaction} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
