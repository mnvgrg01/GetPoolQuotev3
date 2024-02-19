import { ethers } from "ethers";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { toReadableAmount, fromReadableAmount } from "./conversion";
import { FeeAmount } from "@uniswap/v3-sdk";

const QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

export async function quote(signer, ethersProvider, tokenIn, tokenOut, amount) {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    ethersProvider
  );

  const quotedAmountOut = await quoterContract
    .connect(signer)
    .quoteExactInputSingle(
      tokenIn,
      tokenOut,
      FeeAmount.MEDIUM,
      fromReadableAmount(amount, 18).toString(),
      0
    );

  console.log(quotedAmountOut);
  return 24242;

  return toReadableAmount(quotedAmountOut, 18);
}
