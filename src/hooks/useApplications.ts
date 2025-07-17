import {Application} from "@/types/cluster";
import {useQuery} from "@tanstack/react-query";
import {getApplications} from "@/services/order.ts";

export const useApplications = (id: string) => {
  const {data, isLoading, error, refetch} = useQuery<Application>({
    queryKey: ['list-application', id],
    queryFn: async () => {
      const rs = await getApplications() as any
      const order = rs.order;
      return {
        id: order.id,
        name: order.name,
        createdAt: new Date(Number(order.createdAt) * 1000),
        updatedAt: new Date(Number(order.updatedAt) * 1000),
      }
    }
  })

  return {
    applications: data,
    isLoading,
    error,
    refetch,
  }
};