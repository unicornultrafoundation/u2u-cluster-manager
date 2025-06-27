import { useQuery } from "@tanstack/react-query";

export const useMachineStatus = (machineIP: string) => {
  const { data: machineStatus, isLoading, error } = useQuery({
    queryKey: ["machineStatus", machineIP],
    queryFn: () => {
      if (machineIP === "") {
        return "Unknown";
      }
      return "Active";
    },
  });

  return {
    machineStatus,
    isLoading,
    error
  }
};