"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import lotteryContract from '../contracts/Lottery.json';

const LotteryApp = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                setProvider(provider);

                const signer = provider.getSigner();
                setSigner(signer);

                const account = await signer.getAddress();
                setAccount(account);

                const network = await provider.getNetwork();
                const deployedNetwork = lotteryContract.networks[network.chainId];
                const contractInstance = new ethers.Contract(
                    deployedNetwork && deployedNetwork.address,
                    lotteryContract.abi,
                    signer
                );
                setContract(contractInstance);

                const participants = await contractInstance.getParticipants();
                setParticipants(participants);

                const balance = await provider.getBalance(contractInstance.address);
                setBalance(ethers.utils.formatEther(balance));
            }
        };
        init();
    }, []);

    const enterLottery = async () => {
        await contract.enter({
            value: ethers.utils.parseEther('0.001')
        });
        const participants = await contract.getParticipants();
        setParticipants(participants);
    };

    return (
        <div>
            <h1>Lottery DApp</h1>
            <p>Account: {account}</p>
            <p>Balance: {balance} Ether</p>
            <button onClick={enterLottery}>Enter Lottery</button>
            <h2>Participants</h2>
            <ul>
                {participants.map((participant, index) => (
                    <li key={index}>{participant}</li>
                ))}
            </ul>
        </div>
    );
};

export default LotteryApp;
