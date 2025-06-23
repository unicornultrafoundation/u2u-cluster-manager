import { useMutation } from "@tanstack/react-query";
import BID_ABI from "@/abi/SUBNET_BID_MARKETPLACE.json";
import { useWriteContract } from "wagmi";
import { BID_MARKETPLACE_CONTRACT_ADDRESS } from "@/config/constant";

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
  const { data: hash, writeContract } = useWriteContract()
  const {mutate: createNewCluster} = useMutation({
    mutationFn: async (params: CreateNewClusterProps) => {
      return writeContract({
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
      
    },
  });

  return {
    createNewCluster,
    hash
  };
};