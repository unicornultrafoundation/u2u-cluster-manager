import {getOrderByOwner} from "@/services/order";
import {Order} from "@/types/cluster";
import {getRegionCode} from "@/utils/region";
import {useQuery} from "@tanstack/react-query";
import {useAccount} from "wagmi";


export interface QueryParams {
  page: number
  limit: number
  expiredAt?: number
  createdAt?: number
  status?: string
  machineType?: string
  orderBy?: string,
  queryKey: string
}

export const useMyOrder = (props: QueryParams) => {
  const {
    page, limit, queryKey,
    createdAt, expiredAt,
    status, machineType, orderBy
  } = props;
  
  const {address} = useAccount()
  const skip = (page - 1) * limit;
  const {data: myOrders, isLoading, error, refetch} = useQuery<Order[]>({
    queryKey: [queryKey, address, limit, skip, status, machineType, createdAt, expiredAt, orderBy],
    queryFn: async () => {
      if(!address) {
        return [] as Order[];
      }
      
      const rs = await getOrderByOwner(address, limit, skip, status, machineType, createdAt, expiredAt, orderBy) as any;
      
      console.log(rs)
      return rs.orders.map((order: any) => {
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
      })
    },
  });
  
  return {
    myOrders,
    isLoading,
    error,
    refetch
  }
};