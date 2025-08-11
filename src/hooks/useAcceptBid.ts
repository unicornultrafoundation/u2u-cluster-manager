import { BID_MARKETPLACE_CONTRACT_ADDRESS } from "@/config/constant";
import BID_ABI from "@/abi/SUBNET_BID_MARKETPLACE.json";
import { useMutation } from "@tanstack/react-query";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from "@/config/wagmi";

interface AcceptBidParams {
  orderId: string;
  bidIndex: number;
}

export const useAcceptBid = () => {
  const { data: hash, writeContractAsync, reset: resetWriteContract } = useWriteContract()
  const {mutateAsync: acceptBid, reset: resetAcceptBid, isPending} = useMutation({
    mutationFn: async (params: AcceptBidParams) => {
      const rs = await writeContractAsync({
        address: BID_MARKETPLACE_CONTRACT_ADDRESS,
        abi: BID_ABI,
        functionName: 'acceptBid',
        args: [
          params.orderId,
          params.bidIndex,
        ],
      })

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: rs, 
      })
      return transactionReceipt;
    }
  })

  return {
    acceptBid,
    hash,
    isPending,
    reset: () => {
      resetWriteContract();
      resetAcceptBid();
    }
  };
}