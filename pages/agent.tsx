import React, { ReactEventHandler, useEffect, useState } from "react";
import { NextPage } from "next";
import tokenContract from "../../artifacts/contracts/token/Token.sol/Token.json";
import { usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction, useConnect, useAccount } from "wagmi";
import { useDebounce } from 'usehooks-ts';
import { ethers } from "ethers";
import ErrorAlert from "../components/Alert";

const Agent: NextPage = (props) => {

    const [userAddress, setUserAddress] = useState('');
    const [mintToken, setMintToken] = useState(0);

    const [receiverAddress, setReceiverAddress] = useState('');
    const [transferToken, setTransferToken] = useState(0);

    //show alert
    const [open, setOpen] = useState(false);

    //close alert
    const handleClose = () => setOpen(false);


    const debouncedUserAddress = useDebounce(userAddress, 500);
    const debouncedReceiverAddress = useDebounce(receiverAddress, 500);
    const debouncedMintToken = useDebounce(mintToken, 500);
    const debouncedTransferToken = useDebounce(transferToken, 500);

    //Token Address
    const TOKEN_ADDRESS = process.env.TOKEN;
    console.log("TOKEN_ADDRESS", TOKEN_ADDRESS);

    //Mint Token Prepare details
    const {
        config,
        error: mintPrepareError,
        isError: isMintPrepareError,
    } = usePrepareContractWrite({
        address: TOKEN_ADDRESS,
        abi: tokenContract.abi,
        functionName: 'mint',
        args: [debouncedUserAddress, debouncedMintToken],
        enabled: Boolean(debouncedUserAddress) && Boolean(debouncedMintToken),
    });

    //Transfer Token Prepare details
    const {
        config: configTransfer,
        error: transferPrepareError,
        isError: isTransferPrepareError,
    } = usePrepareContractWrite({
        address: TOKEN_ADDRESS,
        abi: tokenContract.abi,
        functionName: 'transfer',
        args: [debouncedReceiverAddress, debouncedTransferToken],
        enabled: Boolean(debouncedReceiverAddress) && Boolean(debouncedTransferToken),
    });

    //Mint Token Write details write in blockchain
    const {
        data: mintData,
        write: mint,
        status: mintStatus,
        error: mintError,
        isError: isMintError,
        isLoading: isMintLoading,
        isSuccess: isMintSuccess,
    } = useContractWrite(config);

    //Transfer Token Write details write in blockchain
    const {
        data: transferData,
        write: transfer,
        status: transferStatus,
        error: transferError,
        isError: isTransferError,
        isLoading: isTransferLoading,
        isSuccess: isTransferSuccess,
    } = useContractWrite(configTransfer);

    //Mint Token Wait for transaction
    const { isLoading: isMinting, isSuccess: isMinted } = useWaitForTransaction({
        hash: mintData?.hash,
    });

    //Transfer Token Wait for transaction
    const { isLoading: isTransfering, isSuccess: isTransfered } = useWaitForTransaction({
        hash: transferData?.hash,
    });

    //Read Token Balance of user 1
    const { data: user1 } = useContractRead({
        address: TOKEN_ADDRESS,
        abi: tokenContract.abi,
        functionName: 'balanceOf',
        args: [process.env.USER1],
        watch: true,
         enabled: isMinted || isTransfered
    });

    //Read Token Balance of user 2
    const { data: user2 } = useContractRead({
        address: TOKEN_ADDRESS,
        abi: tokenContract.abi,
        functionName: 'balanceOf',
        args: [process.env.USER2],
        watch: true,
        enabled: isMinted || isTransfered
    })

    //Handle User Address
    const handleUserAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAddress(e.target.value);
    }

    //Handle Mint Token
    const handleMintToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMintToken(parseInt(e.target.value));
    }

    const handleReceiverAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReceiverAddress(e.target.value);
    }

    const handleTransferToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransferToken(parseInt(e.target.value));
    }

    const handleTransferingToken = () => {
        console.log("receiverAddress:", receiverAddress);
        transfer?.();
    }

    const handleMintingToken = () => {
        console.log("userAddress:", userAddress);
        mint?.();
    }
    useEffect(() => {
        if (isTransferPrepareError || isTransferError) {
            console.log("isTransferError:", isTransferError);
            setOpen(true);
        }
    }, [isTransferPrepareError, isTransferError]);

    return (
        <div className="container ml-10">
            <div className="flex flex-row justify-center py-2">
                <h1 className="text-4xl font-bold">
                    Agent Dashboard
                </h1>
            </div>
            <div className="flex justify-evenly py-4 border-2 my-4">
                <div className="flex flex-col items-center justify-center">
                    {/* investor photo*/}

                    <h2 className="text-xl font-bold">Investor 1</h2>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <h3 className="text-sm font-bold text-black">Address </h3>
                            <div className="text-sm font-thin text-black">0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC</div>
                            <h3 className="text-xl font-bold text-blue-900">Balance: {user1?.toString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold my-2">Transfer TOKEN</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleTransferingToken();
                    }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Receiver's Address
                            </label>
                            <input onChange={handleReceiverAddress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user-address" type="text" placeholder="Receiver Address" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                No Of Tokens
                            </label>
                            <input onChange={handleTransferToken} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="tokens" type="text" placeholder="1000" />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                disabled={!transfer || isTransfering}
                                className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
                            >
                                {isTransferLoading ? "Transfering" : "Transfer Tokens"}
                            </button>
                        </div>
                        {isTransferSuccess && <div className="text-green-500">Transfered Successfully</div>}
                        {isTransferLoading && <div className="text-red-500">Transfering...</div>}
                        {transferError && <div className="text-red-500">Error: {transferError.message}</div>}

                    </form>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold">Investor 2</h2>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <h3 className="text-sm font-bold text-black">Address </h3>
                            <div className="text-sm font-thin text-black">0x90F79bf6EB2c4f870365E785982E1f101E93b906</div>
                            <h3 className="text-xl font-bold text-blue-900">Balance: {user2?.toString()}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center my-5 border-2 py-4">
                <h3 className="text-xl font-bold my-2">MINT TOKEN</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleMintingToken()
                }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            User Address
                        </label>
                        <input onChange={handleUserAddress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user-address" type="text" placeholder="User Address" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            No Tokens
                        </label>
                        <input onChange={handleMintToken} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="tokens" type="text" placeholder="1000" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            disabled={!mint || isMinting}
                            className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
                        >
                            {isMinting ? "Minting..." : "Mint Tokens"}
                        </button>

                    </div>
                    <div className="flex items-center justify-center pt-3">
                        {isMinted && <div className="text-sm">Successfully minted</div>}
                        {(isMintPrepareError || isMintError) && (<div className="text-sm text-red-500">Error: {(mintPrepareError || mintError)?.message}</div>)}
                    </div>

                </form>
            </div>
            {open && isTransferPrepareError && (<p className="text-red-500"> title={transferPrepareError?.name} message={transferPrepareError?.message} </p>)}
            {transferError && <div className="text-red-500">Error: {transferError.message}</div>}
        </div>

    );
}

export default Agent;