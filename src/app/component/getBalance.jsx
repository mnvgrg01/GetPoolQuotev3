"use client";

import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { useState } from "react";

export default function GetBalance() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [balance, setBalance] = useState();

  async function getBalance() {
    if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    // The Contract object
    // const USDTContract = new Contract(USDTAddress, USDTAbi, signer);
    // const USDTBalance = await USDTContract.balanceOf(address);
    const balance = await ethersProvider.getBalance(address);

    console.log(formatUnits(balance, 18));

    setBalance(formatUnits(balance, 18));
  }

  return (
    <>
      <button
        className="mt-5 border rounded active:scale-75"
        onClick={getBalance}
      >
        Get User Balance
      </button>

      {balance && (
        <h5>
          User Balance for {address} : {balance}
        </h5>
      )}
    </>
  );
}
