import { Application } from "@/types/cluster";
import { useQuery } from "@tanstack/react-query";
import {SUBNET_APPS_URL} from "@/config/constant.ts";

export const useApplications = () => {
  const { data, isLoading, error, refetch } = useQuery<Application[]>({
    queryKey: ['list-application'],
    queryFn: async () => {
      const res = await fetch(SUBNET_APPS_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch applications');
      }
      const rawData = await res.json();
      return rawData as Application[];
    },
    staleTime: 5 * 60 * 1000,
  });
  
  return {
    applications: data || [],
    isLoading,
    error,
    refetch,
  };
};
