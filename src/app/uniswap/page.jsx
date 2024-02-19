"use client";
import React, { useState, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import GetBalance from "../component/getBalance";
import { quote } from "../util/quote";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

const ListingModal = ({}) => {
  const [tokenIn, setTokenIn] = useState();
  const [tokenOut, setTokenOut] = useState();
  // const [poolContract, setPoolContract] = useState();
  const [amount, setAmount] = useState();
  const { open } = useWeb3Modal();
  const [quoteRes, setQuoteRes] = useState();

  const { walletProvider } = useWeb3ModalProvider();

  const getQuote = async () => {
    const ethersProvider = await new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    try {
      const res = await quote(
        signer,
        ethersProvider,
        tokenIn,
        tokenOut,
        amount
      );
      console.log(res);
      if (res) {
        setQuoteRes(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black text-white flex-col ml-10">
      <h1 className="text-2xl">Get Pool Quote </h1>
      <br />
      <h5> Token In </h5>
      <input
        className="text-black w-2/3"
        id="value"
        type="text"
        name="value"
        onChange={(e) => setTokenIn(e.target.value)}
      />
      <br />
      <h5 className="mt-5"> Amount In </h5>
      <input
        className="text-black w-2/3"
        id="value"
        type="number"
        name="value"
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <h5 className="mt-5"> Token Out </h5>
      <input
        className="text-black w-2/3"
        id="value"
        type="text"
        name="value"
        onChange={(e) => setTokenOut(e.target.value)}
      />
      {/* <br />
      <h5 className="mt-5"> Pool Factory Contract </h5>
      <input
        id="value"
        type="text"
        name="value"
        onChange={(e) => setPoolContract(e.target.value)}
      /> */}
      <div className="mt-5">
        <button
          size="small"
          type="button"
          className="mt-5 rounded border text-white active:scale-75"
          onClick={getQuote}
        >
          Get Quote
        </button>
        {quoteRes && <h4 className="mt-5 "> {quoteRes}</h4>}
      </div>

      <div className="mt-5 text-white">
        <GetBalance />
      </div>

      <div className="flex-col">
        <button
          className="mt-5 border rounded active:scale-75"
          onClick={() => open()}
        >
          Open Connect Modal
        </button>

        <button
          className="mt-5 border rounded active:scale-75 ml-5"
          onClick={() => open({ view: "Networks" })}
        >
          Open Network Modal
        </button>
      </div>
    </div>
  );
};

ListingModal.propTypes = {};

export default ListingModal;
