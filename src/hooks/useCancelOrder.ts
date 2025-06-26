import { useMutation } from "@tanstack/react-query";
import { useWriteContract } from "wagmi";
import { BID_MARKETPLACE_CONTRACT_ADDRESS } from "@/config/constant";
import BID_ABI from "@/abi/SUBNET_BID_MARKETPLACE.json";
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from "@/config/wagmi";

export const useCancelOrder = () => {
  const { data: hash, writeContractAsync, reset: resetWriteContract } = useWriteContract()
  const { mutateAsync: cancelOrder, isPending, error } = useMutation({
    mutationFn: async (orderId: string) => {
      const rs = await writeContractAsync({
        address: BID_MARKETPLACE_CONTRACT_ADDRESS,
        abi: BID_ABI,
        functionName: 'cancelOrder',
        args: [
          orderId
        ],
      })
      // const rs = '0x554b2631cdfbf9b74a7593b021194225df2899dc76d9c8dac048bf826b9b5e00'
      // console.log('create order hash', rs);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: rs, 
      })
      return transactionReceipt;
    },
  });

  return {
    hash,
    cancelOrder,
    isPending,
    error,
    reset: resetWriteContract,
  }
};