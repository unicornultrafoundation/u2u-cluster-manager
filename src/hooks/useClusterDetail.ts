import { getOrderById } from "@/services/order";
import { Cluster } from "@/types/cluster";
import { getRegionCode } from "@/utils/region";
import { useQuery } from "@tanstack/react-query";

export const useClusterDetail = (id: string) => {
  const {data, isLoading, error, refetch} = useQuery<Cluster>({
    queryKey: ['cluster-detail', id],
    queryFn: async () => {
      const rs = await getOrderById(id) as any
      const order = rs.order;
      return {
        id: order.id,
        name: order.name,
        status: order.status,
        machineType: order.machineType === "1" ? "Docker" : order.machineType === "2" ? "Kubernetes" : "Kvm",
        owner: order.owner,
        region: getRegionCode(order.region),
        cpuCores: Number(order.cpuCores),
        gpuCores: Number(order.gpuCores),
        gpuMemory: Number(order.gpuMemory),
        memoryMB: Number(order.memoryMB),
        diskGB: Number(order.diskGB),
        uploadMbps: Number(order.uploadMbps),
        downloadMbps: Number(order.downloadMbps),
        specs: order.specs,
        // acceptedProvider: string | null
        acceptedMachine: order.acceptedMachine,
        startAt: order.startAt ? new Date(order.startAt) : null,
        expiredAt: order.expiredAt ? new Date(order.expiredAt) : null,
        lastPaidAt: order.lastPaidAt ? new Date(order.lastPaidAt) : null,
        transactionHash: order.transactionHash,
        createdAt: new Date(Number(order.createdAt) * 1000),
        updatedAt: new Date(Number(order.updatedAt) * 1000),
      }
    }
  })

  return {
    clusterDetail: data,
    isLoading,
    error,
    refetch,
  }
};