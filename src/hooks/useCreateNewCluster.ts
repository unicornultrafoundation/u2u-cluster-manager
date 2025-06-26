import { useMutation } from "@tanstack/react-query";
import { waitForTransactionReceipt } from '@wagmi/core'
import BID_ABI from "@/abi/SUBNET_BID_MARKETPLACE.json";
import { useWriteContract } from "wagmi";
import { BID_MARKETPLACE_CONTRACT_ADDRESS } from "@/config/constant";
import { useEffect } from "react";
import { config } from "@/config/wagmi";

interface CreateNewClusterProps {
  machineType: number;
  duration: number;
  minBidPrice: number;
  maxBidPrice: number;
  region: number;
  cpuCores: number;
  gpuCores: number;
  gpuMemory: number;
  memoryMB: number;
  diskGB: number;
  uploadMbps: number;
  downloadMbps: number;
  specs: string;
}

export const useCreateNewCluster = () => {
  const { data: hash, writeContractAsync, reset: resetWriteContract } = useWriteContract()
  const {mutateAsync: createNewCluster, reset: resetCreateNewCluster, isPending} = useMutation({
    mutationFn: async (params: CreateNewClusterProps) => {
      const rs = await writeContractAsync({
        address: BID_MARKETPLACE_CONTRACT_ADDRESS,
        abi: BID_ABI,
        functionName: 'createOrder',
        args: [
          params.machineType,
          params.duration,
          params.minBidPrice,
          params.maxBidPrice,
          params.region,
          params.cpuCores,
          params.gpuCores,
          params.gpuMemory,
          params.memoryMB,
          params.diskGB,
          params.uploadMbps,
          params.downloadMbps,
          params.specs
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

  useEffect(() => {
    if (hash) {
      console.log(hash);
    }
  }, [hash]);

  return {
    createNewCluster,
    hash,
    isPending,
    reset: () => {
      resetWriteContract();
      resetCreateNewCluster();
    }
  };
};